---
title: "Managing Kubernetes Secrets in Git Without Exposing Them"
description: "How Kubernetes Sealed Secrets let you store encrypted credentials safely in Git while keeping GitOps workflows fully automated."
date: 2026-07-08
category: Kubernetes
image: /blog/kubernetes/kubernetes-sealed-secrets-gitops.jpg
linkedin: https://www.linkedin.com/in/kalijavedubhanu
tags: [Kubernetes, GitOps, Security, SealedSecrets, ArgoCD, Flux]
---

One of the biggest challenges in Kubernetes and GitOps workflows is handling secrets securely.

We want:
- Everything stored in Git
- Full version control
- Automated deployments

But we don't want:
- Plain-text passwords in repositories
- API keys exposed to developers
- Secrets leaking through Git history

This is where Kubernetes Sealed Secrets comes in.

### How Sealed Secrets Work

1. Create a Kubernetes Secret.
2. Encrypt it using the cluster's public key (`kubeseal`).
3. Store the encrypted SealedSecret safely in Git.
4. Deploy via GitOps tools like Argo CD or Flux.
5. The Sealed Secrets Controller decrypts it inside the cluster using its private key.

Result:
- Safe in Git
- Safe in CI/CD pipelines
- Only the target cluster can decrypt it

### Try It Yourself

**1. Install the controller (once per cluster)**

```bash
kubectl apply -f \
  https://github.com/bitnami-labs/sealed-secrets/releases/latest/download/controller.yaml
```

**2. Get the cluster's public cert**

```bash
kubeseal --fetch-cert > public-cert.pem
```

**3. Create a regular Kubernetes Secret**

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-db-secret
type: Opaque
data:
  username: YWRtaW4=
  password: UGFzc3dvcmQxMjM=
```

**4. Seal it with the public cert**

```bash
kubeseal --cert public-cert.pem \
  < my-secret.yaml > sealedsecret.yaml
```

**5. Commit `sealedsecret.yaml` to Git**

```bash
git add sealedsecret.yaml
git commit -m "Add sealed db secret"
git push
```

Argo CD or Flux then syncs the `SealedSecret` resource into the cluster, where the controller decrypts it into a regular `Secret` that your pods can consume — the plaintext value never touches Git or CI/CD logs.

> Note: a `SealedSecret` encrypted for one cluster's public key cannot be decrypted by another cluster — the private key never leaves the controller.

### Why Use Sealed Secrets?

- GitOps-friendly
- Secrets can be stored in source control
- Reduces accidental secret exposure
- Cluster-specific encryption
- Easy integration with Argo CD and Flux
- No manual secret creation after deployment

### Best Practices

- Store only SealedSecrets in Git
- Restrict access to secret repositories
- Combine with RBAC and network policies
- Rotate secrets regularly
- Monitor Sealed Secrets Controller health
- Use namespaces to isolate workloads

### Sealed Secrets vs. Kubernetes Secrets

**Kubernetes Secret**
- Base64 encoded
- Not encrypted by default
- Unsafe to store directly in Git

**Sealed Secret**
- Encrypted using the cluster's public key
- Safe to store in Git
- Automatically decrypted inside the cluster

### Key Takeaway

Sealed Secrets bridge the gap between GitOps and security. You get the benefits of Git-based deployments while ensuring sensitive credentials remain protected throughout the delivery pipeline.
