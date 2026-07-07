export interface TopicItem {
  name: string;
  desc: string;
}

export interface TopicCategory {
  slug: string;
  label: string;
  items: TopicItem[];
}

export const topicCategories: TopicCategory[] = [
  {
    slug: 'protocols',
    label: 'Protocols',
    items: [
      { name: 'HTTP / HTTPS', desc: "Application-layer protocol for transferring hypertext; HTTPS adds a TLS layer on top so data can't be read or tampered with in transit." },
      { name: 'TCP', desc: 'Connection-oriented transport protocol that guarantees ordered, reliable delivery via handshakes and retransmission — the foundation under HTTP, SSH, and most reliable network traffic.' },
      { name: 'UDP', desc: 'Connectionless transport protocol with no delivery guarantees or ordering, trading reliability for lower latency — used for DNS, video streaming, and gaming.' },
      { name: 'WebSocket', desc: 'Full-duplex protocol that upgrades an HTTP connection into a persistent, bidirectional channel, letting server and client push messages to each other in real time.' },
      { name: 'gRPC', desc: 'High-performance RPC framework built on HTTP/2 and Protocol Buffers, commonly used for efficient service-to-service communication inside microservices.' },
      { name: 'DNS', desc: 'Resolves human-readable domain names into IP addresses through a distributed, hierarchical system of name servers.' },
      { name: 'SSH', desc: 'Encrypted protocol for securely accessing and executing commands on a remote machine, replacing insecure protocols like Telnet.' },
      { name: 'FTP / SFTP', desc: 'FTP moves files between systems in the clear; SFTP tunnels the same file operations over SSH so credentials and data stay encrypted.' },
      { name: 'SMTP', desc: "Protocol used to send email between mail servers; retrieving mail from a server typically uses IMAP or POP3 instead." },
      { name: 'MQTT', desc: 'Lightweight publish/subscribe messaging protocol designed for constrained IoT devices and unreliable, low-bandwidth networks.' },
      { name: 'QUIC / HTTP/3', desc: "Transport protocol built on UDP that combines TCP-like reliability with faster connection setup and no head-of-line blocking; HTTP/3 runs on top of it." },
      { name: 'TLS / SSL', desc: 'Cryptographic protocol that encrypts data in transit and verifies server identity via certificates — the security layer underlying HTTPS.' },
    ],
  },
  {
    slug: 'auth-models',
    label: 'Authentication Models',
    items: [
      { name: 'Basic Auth', desc: 'Sends a base64-encoded username:password pair in the Authorization header on every request — simple, but trivially decoded without HTTPS.' },
      { name: 'API Key', desc: "A single static token sent in a header or query param to identify the calling application — simple, but doesn't identify individual users and is hard to rotate safely." },
      { name: 'Bearer Token / JWT', desc: 'A signed, self-contained token presented in the Authorization header; the server verifies it cryptographically without a database lookup, at the cost of harder revocation.' },
      { name: 'OAuth 2.0', desc: "Delegated authorization framework that lets a user grant a third-party app limited access to their resources without sharing their password, using access and refresh tokens." },
      { name: 'OpenID Connect', desc: 'Identity layer built on top of OAuth 2.0 that adds a standardized ID token, turning an authorization protocol into a full authentication and login protocol.' },
      { name: 'SAML', desc: 'XML-based protocol for exchanging authentication and authorization assertions between an identity provider and a service provider, common in enterprise SSO.' },
      { name: 'Session-based (Cookies)', desc: 'The server creates a session on login and hands the client an opaque cookie ID; it looks up session state on each request instead of trusting a signed token.' },
      { name: 'Mutual TLS (mTLS)', desc: 'Both client and server present certificates during the TLS handshake, authenticating each other cryptographically — common for service-to-service auth inside a mesh.' },
      { name: 'HMAC Signature', desc: "A request is signed with a shared secret key, and the server recomputes the signature to verify it wasn't tampered with and came from a trusted sender." },
      { name: 'Multi-Factor Authentication (MFA)', desc: 'Requires two or more independent proofs of identity — something you know, have, or are — layering an OTP, hardware key, or biometric on top of a password.' },
    ],
  },
  {
    slug: 'http-methods',
    label: 'HTTP Methods',
    items: [
      { name: 'GET', desc: "Retrieves a representation of a resource; safe and idempotent — repeating it never changes server state, which is why it's cacheable." },
      { name: 'POST', desc: 'Submits data to create a new resource or trigger a server-side action; neither safe nor idempotent — sending it twice can create two resources.' },
      { name: 'PUT', desc: 'Replaces a resource entirely with the supplied representation; idempotent — sending the same PUT twice leaves the resource in the same end state.' },
      { name: 'PATCH', desc: 'Applies a partial update to a resource, changing only the specified fields rather than replacing the whole thing; not guaranteed idempotent depending on the patch format.' },
      { name: 'DELETE', desc: 'Removes the specified resource; idempotent, since deleting an already-deleted resource still ends with it gone.' },
      { name: 'HEAD', desc: 'Identical to GET but returns only headers, no body — used to check if a resource exists or read its metadata without downloading it.' },
      { name: 'OPTIONS', desc: 'Asks the server which HTTP methods and headers are allowed for a resource; browsers send this automatically as a CORS preflight request.' },
      { name: 'TRACE', desc: 'Echoes back the received request for diagnostic loop-back testing; rarely used and often disabled since it can expose sensitive headers.' },
      { name: 'CONNECT', desc: 'Establishes a tunnel to the server, typically used by HTTP proxies to relay an encrypted TLS connection through to the destination.' },
    ],
  },
  {
    slug: 'certificates',
    label: 'Certificates',
    items: [
      { name: 'X.509 Certificate', desc: 'The standard format for a public key certificate, binding a public key to an identity — a domain or organization — and signed by a trusted authority.' },
      { name: 'Certificate Authority (CA)', desc: 'A trusted entity that issues and signs certificates, vouching that the public key inside really belongs to the named subject.' },
      { name: 'Certificate Chain', desc: 'The sequence from a leaf certificate up through intermediate CAs to a trusted root, each link signed by the one above it, that a client walks to establish trust.' },
      { name: 'Root Certificate', desc: 'A self-signed certificate at the top of the chain of trust, pre-installed in operating systems and browsers as an inherently trusted anchor.' },
      { name: 'Intermediate Certificate', desc: 'A certificate signed by a root CA that in turn signs leaf certificates, letting the root stay offline and reducing exposure if a signing key is ever compromised.' },
      { name: 'CSR (Certificate Signing Request)', desc: 'A request containing your public key and identity details, sent to a CA to have it signed into a certificate.' },
      { name: 'Self-Signed Certificate', desc: 'A certificate signed by its own private key rather than a CA — fine for local development, but untrusted by default in browsers and clients.' },
      { name: 'SAN (Subject Alternative Name)', desc: 'An extension listing every hostname a certificate is valid for, allowing one certificate to cover multiple domains or subdomains.' },
      { name: 'Wildcard Certificate', desc: 'Covers all first-level subdomains of a domain (e.g. *.example.com) with a single certificate, instead of issuing one per subdomain.' },
      { name: 'Certificate Pinning', desc: 'Hardcodes an expected certificate or public key inside a client, rejecting connections even if a rogue but technically valid certificate is presented.' },
      { name: 'OCSP / CRL', desc: 'Mechanisms for checking whether a certificate has been revoked before its expiry — OCSP asks in real time, CRL downloads a periodic revocation list.' },
      { name: 'ACME / Let’s Encrypt', desc: 'An automated protocol for requesting, validating, and renewing certificates without human intervention, popularized by the free Let’s Encrypt CA.' },
      { name: 'Certificate Expiration & Renewal', desc: "Certificates are valid for a fixed window, often 90 days to a year; letting one expire silently breaks TLS handshakes until it's renewed and reloaded." },
      { name: 'Private Key', desc: "The secret half of a certificate's key pair that must never leave the server — anyone holding it can impersonate the certificate's identity." },
    ],
  },
];
