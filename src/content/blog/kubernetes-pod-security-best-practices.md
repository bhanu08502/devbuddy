---
title: "Kubernetes Security Starts with Pod Security"
description: "Why pod-level hardening is the foundation of a secure Kubernetes cluster, with concrete securityContext, RBAC, and network policy examples."
date: 2026-07-08
category: Security
image: /blog/security/kubernetes-pod-security-best-practices.jpg
linkedin: https://www.linkedin.com/in/kalijavedubhanu
tags: [Kubernetes, Security, RBAC, PodSecurity, NetworkPolicy]
---

When people think about Kubernetes security, they often focus on cluster hardening, RBAC, or network policies.

But the reality is simple: if a pod gets compromised, an attacker may gain access to the node, the network, secrets, or even the entire cluster.

That's why Pod Security is one of the most important layers in Kubernetes.

### Key Pod Security Practices

- Run containers as a non-root user
- Disable privilege escalation
- Use a read-only root filesystem where possible
- Drop unnecessary Linux capabilities
- Avoid privileged containers
- Avoid `hostNetwork`, `hostPID`, and `hostIPC`
- Set CPU and memory limits
- Enforce Pod Security Admission with the `restricted` profile

### Pod Security Standards

Kubernetes ships three built-in Pod Security Admission profiles, enforced via labels on a namespace:

| Profile | Level | Description | Use when |
|---|---|---|---|
| `privileged` | Least secure | No restrictions | Almost never |
| `baseline` | Balanced | Blocks known privilege escalations | General use |
| `restricted` | Most secure | Strong restrictions, follows best practices | Production workloads |

```bash
# Enforce the restricted profile on a namespace
kubectl label ns payments \
  pod-security.kubernetes.io/enforce=restricted

# Check current enforcement
kubectl get ns payments \
  -o jsonpath='{.metadata.labels}'
```

### A Secure Pod Spec

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
  labels:
    app: web
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 10001
    runAsGroup: 10001
    fsGroup: 10001
  containers:
    - name: web
      image: nginx:1.25
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        capabilities:
          drop: ["ALL"]
      resources:
        requests:
          cpu: "100m"
          memory: "128Mi"
        limits:
          cpu: "500m"
          memory: "512Mi"
```

Common mistakes that break this — all of which the `restricted` profile blocks outright:

- `runAsUser: 0` (running as root)
- `privileged: true`
- `allowPrivilegeEscalation: true`
- Adding capabilities like `NET_ADMIN` or `SYS_ADMIN`
- `readOnlyRootFilesystem: false`
- `hostNetwork`, `hostPID`, or `hostIPC: true`
- Mounting `hostPath` volumes, which expose the node's filesystem

### Beyond Pod Security

- **RBAC** → grant only the permissions required

  ```bash
  kubectl create sa app-sa -n payments
  kubectl create role pod-reader --verb=get,list,watch --resource=pods -n payments
  kubectl create rolebinding app-rb --role=pod-reader \
    --serviceaccount=payments:app-sa -n payments
  ```

- **Network Policies** → control pod-to-pod communication (e.g., allow only frontend → backend, deny everything else) using Calico, Cilium, or Azure CNI network policies.
- **Secrets Management** → store secrets in Kubernetes Secrets or external stores (AWS Secrets Manager, HashiCorp Vault); never in images or env vars in plain text; encrypt at rest; restrict access via RBAC.
- **Image Security** → use trusted, minimal base images; scan for vulnerabilities; sign images (cosign/Notary); always set `ImagePullPolicy` appropriately in production.
- **Continuous Monitoring** → detect misconfigurations early.

### Security Principle

**Least Privilege + Defense in Depth.**

No single control can secure a Kubernetes cluster. Multiple layers working together create a resilient platform.

### Quick Checklist

- Non-root containers
- No privileged mode
- Read-only filesystem
- Resource limits configured
- Network policies enabled
- RBAC implemented
- Trusted images only
- Secrets managed securely

### Key Takeaway

A secure Kubernetes cluster starts with secure pods.

Secure Pods → Secure Nodes → Secure Cluster → Secure Applications
