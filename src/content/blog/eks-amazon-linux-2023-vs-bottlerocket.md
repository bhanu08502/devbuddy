---
title: "Amazon Linux 2023 vs. Bottlerocket for EKS Node Groups"
description: "How to choose the right EKS node AMI — Amazon Linux 2023 for flexibility, Bottlerocket for a minimal, immutable, container-optimized OS."
date: 2026-07-08
category: Cloud
image: /blog/cloud/eks-amazon-linux-2023-vs-bottlerocket.jpg
linkedin: https://www.linkedin.com/in/kalijavedubhanu
tags: [AWS, EKS, Kubernetes, Bottlerocket, AmazonLinux]
---

One question that frequently comes up when building Amazon EKS clusters is: which node AMI should I choose — Amazon Linux 2023 or Bottlerocket?

- **Flexibility** → Amazon Linux 2023
- **Security & immutability** → Bottlerocket

### Amazon Linux 2023 — General Purpose Linux for EKS

- Full OS access (SSH)
- Install packages & tools
- Easy to customize
- Great for most use cases

### Bottlerocket — Container-Optimized OS

- Minimal, immutable OS
- No SSH — access goes through an admin container instead
- Built specifically for Kubernetes
- High security, low attack surface

### Quick Comparison

| | Amazon Linux 2023 | Bottlerocket |
|---|---|---|
| OS access | Yes (SSH) | No (admin container) |
| Install packages | Yes | No |
| Security | High | Very high |
| Customization | Easy | Limited |
| Best for | Most workloads, traditional ops | Container-only workloads, security-first environments |

### Choose Amazon Linux 2023 When

- You need SSH access
- You install custom agents or tools
- You need to troubleshoot easily
- You run mixed or custom workloads

### Choose Bottlerocket When

- You want maximum security
- You run container-only workloads
- You prefer an immutable OS
- You operate at scale with Kubernetes

### Key Takeaway

Right AMI → Right Security → Right Performance → Right Operations.

There's no universally "correct" choice — Amazon Linux 2023 trades some attack surface for operational flexibility, while Bottlerocket trades flexibility for a hardened, purpose-built runtime. Pick based on whether your team needs to SSH in and customize the node, or whether it can live entirely within Kubernetes-native tooling.

What are you running in production today: Amazon Linux 2023 or Bottlerocket?
