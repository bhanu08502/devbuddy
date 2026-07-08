---
title: "Kubernetes Network Policies — One of the Most Underutilized Security Features"
description: "By default Kubernetes lets every pod talk to every other pod. Network Policies fix that — with concrete YAML for deny-all, frontend-to-backend, and DNS access rules."
date: 2026-07-08
category: Security
image: /blog/security/kubernetes-network-policies.jpg
linkedin: https://www.linkedin.com/in/kalijavedubhanu
tags: [Kubernetes, Security, NetworkPolicy, ZeroTrust, Calico, Cilium]
---

By default, Kubernetes allows pods to communicate freely within the cluster.

While this makes application deployment easier, it also increases the attack surface and can lead to unnecessary east-west traffic between workloads.

This is where Network Policies become critical. They act as a firewall for Kubernetes pods, allowing platform teams to explicitly define which workloads can communicate with each other and which traffic should be blocked.

### Why Network Policies Matter

- Zero trust networking
- Microservice isolation
- Reduced blast radius
- Compliance requirements (PCI DSS, HIPAA, SOC2, ISO27001)
- Control ingress (incoming) and egress (outgoing) traffic
- Allow specific ports, namespaces, or IP ranges
- Improved overall cluster security

### Prerequisite: A CNI That Enforces Policies

Network Policies require a CNI plugin that supports them — Calico, Cilium, Weave Net, Antrea, Azure CNI, or Amazon VPC CNI (with Network Policy support).

Not all CNIs enforce policies by default — check yours before assuming you're protected.

### Real-World Example

- Frontend → Backend ✅
- Backend → Database ✅
- Frontend → Database ❌
- Random Pod → Database ❌
- Internet → Database ❌

One of the biggest mistakes in Kubernetes environments is assuming workload isolation exists by default. Without Network Policies, many clusters operate with unrestricted pod-to-pod communication.

### How Network Policies Work

A Network Policy selects pods using labels (`podSelector`), and applies only to pods matching that selector. If a pod matches a Network Policy and the traffic isn't allowed by any rule, that traffic is denied.

### Example 1: Allow Frontend → Backend

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: backend-policy
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: frontend
```

Result: Frontend → Backend allowed. Other pods → Backend denied.

### Example 2: Secure the Database

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-policy
spec:
  podSelector:
    matchLabels:
      app: database
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: backend
```

Result: Backend → Database allowed. Frontend/Monitoring → Database denied.

### Example 3: Deny All Traffic (Start Here)

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress
```

Result: all traffic in and out is blocked — use this as a baseline, then explicitly allow only what's required.

### Example 4: Allow DNS Access

```yaml
egress:
  - to:
      - namespaceSelector:
          matchLabels:
            kubernetes.io/metadata.name: kube-system
    ports:
      - protocol: UDP
        port: 53
```

Allows pods to resolve DNS via CoreDNS running in the `kube-system` namespace — easy to forget once you start denying egress by default.

### Common Policy Patterns

- Allow namespace-to-namespace communication (e.g., pods in Namespace A → pods in Namespace A)
- Restrict internet access (egress) — block a pod from reaching the internet
- Allow only specific ports — e.g., a pod may only reach a service on port 443
- Allow monitoring agents — e.g., Prometheus → application pods

### Implementation in EKS

Amazon VPC CNI + a network policy enforcer (Calico, Cilium, etc.) + `NetworkPolicy` objects.

```bash
# 1. Define your NetworkPolicy YAML
# 2. Apply to cluster
kubectl apply -f network-policy.yaml

# 3. Verify
kubectl get networkpolicy -A

# 4. Describe / debug
kubectl describe networkpolicy <name>
```

### Best Practices

- Start with deny-all and allow explicitly
- Use consistent labels & naming
- Allow DNS (CoreDNS) traffic
- Use namespace isolation
- Document your network flows
- Test policies in lower environments first
- Monitor & audit denied traffic
- Combine with RBAC, Pod Security Standards, and security groups (EKS)

### Key Takeaway

Network Policies are your Kubernetes firewall. They help you build secure, isolated, and compliant applications using Zero Trust principles.

How are you implementing workload isolation in your Kubernetes clusters — Calico, Cilium, Amazon VPC CNI, or another solution?
