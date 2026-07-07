export interface ServiceItem {
  name: string;
  desc: string;
  example: string;
}

export interface ServiceGroup {
  label: string;
  items: ServiceItem[];
}

export interface InstallStep {
  platform: string;
  command: string;
}

export interface Tool {
  slug: string;
  name: string;
  logo: string;
  desc: string;
  concepts: string[];
  install: InstallStep[];
  commands: string[];
  services: ServiceGroup[];
}

export interface Category {
  label: string;
  tools: Tool[];
}

export const categories: Category[] = [
  {
    label: 'Cloud Platforms',
    tools: [
      {
        slug: 'aws',
        name: 'AWS',
        logo: 'aws',
        desc: 'Amazon\'s cloud platform — the broadest set of compute, storage, networking, and managed services, including MSK (Kafka) and EKS (Kubernetes).',
        concepts: ['EC2 — virtual machines', 'S3 — object storage', 'IAM — identity & permissions', 'VPC — networking', 'Lambda — serverless functions', 'EKS / MSK — managed Kubernetes & Kafka'],
        install: [
          { platform: 'macOS (Homebrew)', command: 'brew install awscli' },
          { platform: 'Linux', command: 'curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && unzip awscliv2.zip && sudo ./aws/install' },
          { platform: 'Windows', command: 'winget install Amazon.AWSCLI' },
        ],
        commands: ['aws configure', 'aws s3 ls', 'aws ec2 describe-instances', 'aws eks update-kubeconfig --name <cluster>'],
        services: [
          {
            label: 'Compute',
            items: [
              { name: 'EC2', desc: 'Resizable virtual machines billed by the second, with hundreds of instance types tuned for general purpose, compute, memory, or GPU workloads. The building block most other AWS compute services (ECS, EKS, Beanstalk) run on top of.', example: 'aws ec2 run-instances --image-id ami-0abcdef --instance-type t3.micro' },
              { name: 'Lambda', desc: 'Run code in response to events — HTTP requests, queue messages, file uploads — without provisioning or managing servers. You pay only for the compute time consumed, down to the millisecond.', example: 'aws lambda invoke --function-name my-fn out.json' },
              { name: 'ECS', desc: 'AWS-native container orchestration that schedules and scales Docker containers without the operational overhead of running Kubernetes. Pairs naturally with Fargate for a fully serverless container platform.', example: 'aws ecs create-service --cluster my-cluster --service-name web --task-definition web:1' },
              { name: 'EKS', desc: 'Managed, highly available Kubernetes control plane — AWS runs the API server and etcd, you bring the worker nodes (or use Fargate). The standard choice when you need Kubernetes APIs and ecosystem on AWS.', example: 'aws eks create-cluster --name my-cluster --role-arn <arn> --resources-vpc-config subnetIds=<ids>' },
              { name: 'Fargate', desc: 'Serverless compute layer for ECS and EKS: define CPU/memory per task and AWS provisions the underlying capacity, with no EC2 instances to patch or scale.', example: 'aws ecs run-task --cluster my-cluster --launch-type FARGATE --task-definition web:1' },
              { name: 'Elastic Beanstalk', desc: 'Upload your application code and Beanstalk handles provisioning, load balancing, scaling, and health monitoring for you. A quick on-ramp for teams that do not want to manage the underlying infrastructure directly.', example: 'eb deploy' },
              { name: 'Lightsail', desc: 'Simplified VPS-style hosting with flat monthly pricing, bundling compute, storage, and networking into one plan. Aimed at simple websites and small apps that do not need full AWS complexity.', example: 'aws lightsail create-instances --instance-names my-vm --availability-zone us-east-1a --blueprint-id ubuntu_22_04 --bundle-id nano_2_0' },
              { name: 'Batch', desc: 'Runs large-scale batch computing jobs — hundreds or thousands of jobs — across dynamically provisioned EC2 or Fargate capacity, handling queuing, scheduling, and retries for you.', example: 'aws batch submit-job --job-name my-job --job-queue my-queue --job-definition my-def' },
              { name: 'App Runner', desc: 'Deploys containerized web apps and APIs straight from source code or a container image, with build, deploy, load balancing, and autoscaling handled automatically.', example: 'aws apprunner create-service --service-name my-app --source-configuration file://source.json' },
              { name: 'Outposts', desc: 'Extends AWS infrastructure and APIs onto physical hardware racks in your own data center, for workloads that need low latency to on-prem systems or must keep data on-site.', example: 'aws outposts list-outposts' },
              { name: 'Auto Scaling', desc: 'Automatically adds or removes EC2 instances to match real-time demand and target metrics, keeping applications responsive under load spikes while avoiding paying for idle capacity.', example: 'aws autoscaling update-auto-scaling-group --auto-scaling-group-name my-asg --min-size 2 --max-size 10' },
            ],
          },
          {
            label: 'Storage',
            items: [
              { name: 'S3', desc: 'Object storage for effectively unlimited data, accessed over HTTP with eleven nines of durability. The default backing store for backups, data lakes, static sites, and countless other AWS services.', example: 'aws s3 cp file.txt s3://my-bucket/' },
              { name: 'EBS', desc: 'Persistent block storage volumes attached to EC2 instances, behaving like a network-attached hard drive that survives instance stop/start and can be snapshotted.', example: 'aws ec2 create-volume --availability-zone us-east-1a --size 100 --volume-type gp3' },
              { name: 'EFS', desc: 'Managed, elastic NFS file storage that multiple EC2 instances or containers can mount and share concurrently, growing and shrinking automatically as you add or remove files.', example: 'aws efs create-file-system --performance-mode generalPurpose' },
              { name: 'FSx', desc: 'Fully managed file systems built on proven third-party engines — Windows File Server, Lustre for HPC, and NetApp ONTAP — for workloads that need specific file-system compatibility.', example: 'aws fsx create-file-system --file-system-type LUSTRE --storage-capacity 1200' },
              { name: 'Glacier', desc: 'Extremely low-cost archival storage for data you rarely access, trading retrieval speed (minutes to hours) for a fraction of standard S3 pricing.', example: 'aws glacier create-vault --vault-name my-vault --account-id -' },
              { name: 'Storage Gateway', desc: 'Bridges on-premises applications with cloud storage, presenting S3, EBS, or Glacier as local file shares, volumes, or tape backups so legacy systems can use cloud storage transparently.', example: 'aws storagegateway create-cached-iscsi-volume --gateway-arn <arn> --volume-size-in-bytes 107374182400' },
              { name: 'AWS Backup', desc: 'Centralizes backup policy across EC2, RDS, EFS, DynamoDB, and more, so you define one schedule and retention rule instead of managing backups per service.', example: 'aws backup start-backup-job --backup-vault-name my-vault --resource-arn <arn> --iam-role-arn <arn>' },
            ],
          },
          {
            label: 'Database',
            items: [
              { name: 'RDS', desc: 'Managed relational databases — MySQL, PostgreSQL, MariaDB, Oracle, SQL Server — with automated backups, patching, and Multi-AZ failover handled by AWS.', example: 'aws rds create-db-instance --db-instance-identifier mydb --engine postgres --db-instance-class db.t3.micro' },
              { name: 'DynamoDB', desc: 'Fully managed NoSQL key-value and document database built for single-digit-millisecond latency at virtually any scale, with no servers to provision or manage.', example: 'aws dynamodb put-item --table-name Users --item \'{"id":{"S":"1"}}\'' },
              { name: 'Aurora', desc: 'AWS-built database engine that is wire-compatible with MySQL and PostgreSQL but re-architected for the cloud, claiming several times the throughput of stock MySQL at similar cost.', example: 'aws rds create-db-cluster --db-cluster-identifier my-cluster --engine aurora-postgresql' },
              { name: 'ElastiCache', desc: 'Managed in-memory data store (Redis or Memcached) used to cache frequent database queries or session data, cutting latency from milliseconds to microseconds.', example: 'aws elasticache create-cache-cluster --cache-cluster-id my-cache --engine redis --cache-node-type cache.t3.micro' },
              { name: 'Redshift', desc: 'Managed data warehouse built for large-scale analytical queries across petabytes of data, using columnar storage and massively parallel processing rather than row-based OLTP.', example: 'aws redshift create-cluster --cluster-identifier my-cluster --node-type dc2.large --master-username admin' },
              { name: 'Neptune', desc: 'Managed graph database purpose-built for highly connected data — social graphs, recommendation engines, fraud detection — queried via Gremlin or openCypher.', example: 'aws neptune create-db-cluster --db-cluster-identifier my-graph-db --engine neptune' },
              { name: 'DocumentDB', desc: 'MongoDB-compatible managed document database that speaks the MongoDB API, letting existing MongoDB drivers and tools work with a fully managed AWS backend.', example: 'aws docdb create-db-cluster --db-cluster-identifier my-docdb --engine docdb' },
              { name: 'Timestream', desc: 'Purpose-built time-series database for IoT sensor data and application metrics, automatically tiering recent data to fast storage and older data to cheap storage.', example: 'aws timestream-write create-database --database-name my-ts-db' },
              { name: 'QLDB', desc: 'Immutable, cryptographically verifiable ledger database that maintains a complete, append-only history of every change — useful anywhere you need a tamper-evident audit trail.', example: 'aws qldb create-ledger --name my-ledger --permissions-mode STANDARD' },
              { name: 'Keyspaces', desc: 'Managed, serverless database compatible with Apache Cassandra\'s API, so existing Cassandra applications and drivers work without running your own Cassandra cluster.', example: 'aws keyspaces create-keyspace --keyspace-name my_keyspace' },
            ],
          },
          {
            label: 'Networking & Content Delivery',
            items: [
              { name: 'VPC', desc: 'Isolated virtual network for your AWS resources — you define IP ranges, subnets, route tables, and gateways, giving you full control over how resources talk to each other and the internet.', example: 'aws ec2 create-vpc --cidr-block 10.0.0.0/16' },
              { name: 'Route 53', desc: 'Highly available DNS service and domain registrar, also supporting health checks and routing policies (latency-based, geo, weighted) to direct traffic intelligently.', example: 'aws route53 create-hosted-zone --name example.com --caller-reference 2026-01-01' },
              { name: 'CloudFront', desc: 'Global CDN that caches content at edge locations close to users, cutting latency for static assets and dynamic content while offloading traffic from origin servers.', example: 'aws cloudfront create-distribution --origin-domain-name mybucket.s3.amazonaws.com' },
              { name: 'ELB (ALB/NLB)', desc: 'Load balancers that distribute incoming traffic across multiple targets — Application Load Balancer for HTTP/HTTPS routing, Network Load Balancer for raw TCP/UDP performance.', example: 'aws elbv2 create-load-balancer --name my-alb --subnets subnet-abc subnet-def' },
              { name: 'API Gateway', desc: 'Fully managed service to create, publish, throttle, and secure REST, HTTP, and WebSocket APIs, commonly used as the front door to Lambda functions or backend services.', example: 'aws apigatewayv2 create-api --name my-api --protocol-type HTTP' },
              { name: 'Direct Connect', desc: 'Dedicated, private network link from your data center into AWS, bypassing the public internet for more consistent bandwidth and lower latency than a VPN.', example: 'aws directconnect create-connection --location EqDC2 --bandwidth 1Gbps --connection-name my-dx' },
              { name: 'Transit Gateway', desc: 'Central hub that connects many VPCs and on-premises networks through a single gateway, replacing a tangle of point-to-point VPC peering connections.', example: 'aws ec2 create-transit-gateway --description "hub"' },
              { name: 'PrivateLink', desc: 'Private connectivity to AWS services or partner SaaS products from inside your VPC, without traffic ever traversing the public internet or needing an internet gateway.', example: 'aws ec2 create-vpc-endpoint --vpc-id vpc-abc --service-name com.amazonaws.us-east-1.s3' },
              { name: 'Global Accelerator', desc: 'Routes user traffic over AWS\'s private global network backbone instead of the public internet, improving performance and failover for latency-sensitive applications.', example: 'aws globalaccelerator create-accelerator --name my-ga' },
            ],
          },
          {
            label: 'Security, Identity & Compliance',
            items: [
              { name: 'IAM', desc: 'Manages users, groups, roles, and fine-grained permission policies for every AWS resource — the foundation almost every other security control in AWS builds on.', example: 'aws iam create-role --role-name my-role --assume-role-policy-document file://trust.json' },
              { name: 'KMS', desc: 'Managed creation, storage, and rotation of encryption keys, integrated directly into S3, EBS, RDS, and most other AWS services for encrypting data at rest and in transit.', example: 'aws kms create-key --description "app encryption key"' },
              { name: 'Secrets Manager', desc: 'Securely stores database credentials, API keys, and other secrets, with built-in automatic rotation so applications never hard-code sensitive values.', example: 'aws secretsmanager create-secret --name db/password --secret-string \'{"password":"..."}\'' },
              { name: 'Cognito', desc: 'Managed user directory handling sign-up, sign-in, MFA, and social or enterprise identity federation, plus temporary AWS credentials for authenticated app users.', example: 'aws cognito-idp create-user-pool --pool-name my-users' },
              { name: 'WAF & Shield', desc: 'Web application firewall (WAF) filters malicious HTTP requests like SQL injection and XSS, while Shield provides always-on DDoS protection for your endpoints.', example: 'aws wafv2 create-web-acl --name my-acl --scope REGIONAL --default-action Allow={}' },
              { name: 'GuardDuty', desc: 'Continuously analyzes VPC flow logs, DNS logs, and API activity using machine learning and threat intelligence feeds to flag suspicious behavior without deploying any agents.', example: 'aws guardduty create-detector --enable' },
              { name: 'Security Hub', desc: 'Aggregates security findings from GuardDuty, Inspector, Macie, and third-party tools into one dashboard, alongside automated compliance checks against standards like CIS.', example: 'aws securityhub enable-security-hub' },
              { name: 'Macie', desc: 'Uses machine learning to automatically discover and classify sensitive data — PII, credentials, financial data — stored in S3, and flags buckets with risky access settings.', example: 'aws macie2 enable-macie' },
              { name: 'Certificate Manager (ACM)', desc: 'Provisions and automatically renews free TLS/SSL certificates for use with load balancers, CloudFront, and API Gateway — no manual certificate renewal ever again.', example: 'aws acm request-certificate --domain-name example.com --validation-method DNS' },
              { name: 'IAM Identity Center', desc: 'Centralized single sign-on across all your AWS accounts and many third-party SaaS apps, backed by one identity source instead of separate IAM users per account.', example: 'aws sso-admin list-instances' },
            ],
          },
          {
            label: 'Management & Governance',
            items: [
              { name: 'CloudWatch', desc: 'Collects metrics, logs, and events from AWS resources and applications, with alarms and dashboards to alert on and visualize what is happening across your infrastructure.', example: 'aws cloudwatch put-metric-alarm --alarm-name high-cpu --metric-name CPUUtilization --threshold 80' },
              { name: 'CloudTrail', desc: 'Records an immutable audit log of every API call made in your account — who did what, from where, and when — essential for security investigations and compliance.', example: 'aws cloudtrail create-trail --name my-trail --s3-bucket-name my-logs' },
              { name: 'Config', desc: 'Continuously tracks configuration changes to your resources and evaluates them against rules, so you know exactly when and how something drifted from your desired state.', example: 'aws configservice put-configuration-recorder --configuration-recorder name=default' },
              { name: 'Organizations', desc: 'Centrally manages billing, service control policies, and account creation across a multi-account AWS organization, letting you enforce guardrails at the org level.', example: 'aws organizations create-account --email admin@example.com --account-name dev' },
              { name: 'Control Tower', desc: 'Automates setup of a secure, well-architected multi-account landing zone on top of Organizations, with guardrails and account provisioning workflows built in.', example: 'aws controltower list-landing-zones' },
              { name: 'Trusted Advisor', desc: 'Runs automated checks against your account for cost savings, security gaps, fault tolerance, and performance, surfacing concrete recommendations for each.', example: 'aws support describe-trusted-advisor-checks --language en' },
              { name: 'Systems Manager', desc: 'Operational hub for fleets of instances — patch management, remote command execution, and a secure parameter and secret store — without needing SSH access.', example: 'aws ssm send-command --instance-ids i-abc --document-name AWS-RunShellScript' },
              { name: 'CloudFormation', desc: 'AWS\'s native infrastructure-as-code service — define resources as JSON or YAML templates, and CloudFormation creates, updates, or tears them down as a single stack.', example: 'aws cloudformation deploy --template-file template.yaml --stack-name my-stack' },
              { name: 'Service Catalog', desc: 'Lets platform teams curate a catalog of approved, pre-configured IT products so other teams can self-service provision infrastructure within organizational guardrails.', example: 'aws servicecatalog list-portfolios' },
            ],
          },
          {
            label: 'Application Integration',
            items: [
              { name: 'SQS', desc: 'Fully managed message queues that decouple producers from consumers, buffering work so a slow or failing downstream service does not take the whole system down.', example: 'aws sqs send-message --queue-url <url> --message-body "hello"' },
              { name: 'SNS', desc: 'Pub/sub messaging service that fans out a single published message to many subscribers — email, SMS, push notifications, or SQS queues and Lambda functions.', example: 'aws sns publish --topic-arn <arn> --message "hello"' },
              { name: 'Step Functions', desc: 'Visually orchestrates multi-step workflows across Lambda, ECS, and other services as a state machine, handling retries, branching, and error handling declaratively.', example: 'aws stepfunctions start-execution --state-machine-arn <arn>' },
              { name: 'EventBridge', desc: 'Serverless event bus that routes events between AWS services, your own applications, and SaaS partners based on rules, without any polling or custom glue code.', example: 'aws events put-rule --name my-rule --schedule-expression "rate(5 minutes)"' },
              { name: 'Amazon MQ', desc: 'Managed message broker running actual ActiveMQ or RabbitMQ engines, for migrating existing applications that depend on standard messaging protocols like JMS or AMQP.', example: 'aws mq create-broker --broker-name my-broker --engine-type ActiveMQ' },
              { name: 'AppFlow', desc: 'No-code service that transfers data bidirectionally between SaaS apps (Salesforce, Slack, ServiceNow) and AWS services like S3 or Redshift on a schedule or trigger.', example: 'aws appflow create-flow --flow-name my-flow --cli-input-json file://flow.json' },
            ],
          },
          {
            label: 'Analytics',
            items: [
              { name: 'Athena', desc: 'Runs serverless SQL queries directly against data sitting in S3 — no cluster to provision, you pay per query, ideal for ad-hoc analysis of log or data-lake files.', example: 'aws athena start-query-execution --query-string "SELECT * FROM logs LIMIT 10"' },
              { name: 'EMR', desc: 'Managed Hadoop and Spark clusters for large-scale big data processing, spinning up and tearing down transient clusters instead of running your own on EC2.', example: 'aws emr create-cluster --name my-cluster --release-label emr-6.15.0 --applications Name=Spark' },
              { name: 'Kinesis', desc: 'Ingests and processes real-time streaming data — clickstreams, IoT telemetry, logs — at scale, feeding downstream analytics or storage as records arrive.', example: 'aws kinesis put-record --stream-name my-stream --data "hello" --partition-key key1' },
              { name: 'Glue', desc: 'Serverless ETL service that crawls data to discover its schema, then transforms and moves it between data stores using auto-generated or custom Spark scripts.', example: 'aws glue start-job-run --job-name my-etl-job' },
              { name: 'QuickSight', desc: 'Managed business-intelligence service for building interactive dashboards and visualizations over data in Redshift, Athena, S3, and other AWS sources.', example: 'aws quicksight create-dashboard --aws-account-id <id> --dashboard-id my-dash --cli-input-json file://dash.json' },
              { name: 'Lake Formation', desc: 'Simplifies setting up a secure, governed data lake on S3 — handling ingestion, cataloging, and fine-grained access control that would otherwise take manual setup.', example: 'aws lakeformation register-resource --resource-arn <arn>' },
              { name: 'MSK', desc: 'Fully managed Apache Kafka clusters for streaming data pipelines, handling broker provisioning, replication, and patching while staying wire-compatible with open-source Kafka.', example: 'aws kafka create-cluster --cluster-name my-kafka --kafka-version 3.5.1 --cli-input-json file://msk.json' },
            ],
          },
          {
            label: 'Developer Tools',
            items: [
              { name: 'CodePipeline', desc: 'Orchestrates CI/CD pipelines end to end — source, build, test, deploy — stitching together CodeBuild, CodeDeploy, and third-party tools into one automated release process.', example: 'aws codepipeline start-pipeline-execution --name my-pipeline' },
              { name: 'CodeBuild', desc: 'Fully managed build service that compiles source code, runs tests, and produces deployable artifacts, scaling build capacity automatically with no servers to maintain.', example: 'aws codebuild start-build --project-name my-build' },
              { name: 'CodeDeploy', desc: 'Automates code deployments to EC2, on-premises servers, Lambda, or ECS, supporting rolling and blue/green deployment strategies with automatic rollback on failure.', example: 'aws deploy create-deployment --application-name my-app --deployment-group-name prod' },
              { name: 'CodeCommit', desc: 'Managed, private Git repository hosting integrated with IAM for access control — a fully managed alternative to self-hosting Git infrastructure.', example: 'aws codecommit create-repository --repository-name my-repo' },
              { name: 'Cloud9', desc: 'Browser-based IDE with a built-in terminal and debugger, preconfigured for many runtimes, so you can code and run commands against AWS resources without local setup.', example: 'aws cloud9 create-environment-ec2 --name my-ide --instance-type t3.small' },
              { name: 'X-Ray', desc: 'Distributed tracing service that follows a request as it moves through microservices, visualizing where time is spent and pinpointing the source of latency or errors.', example: 'aws xray put-trace-segments --trace-segment-documents file://segment.json' },
            ],
          },
          {
            label: 'AI & Machine Learning',
            items: [
              { name: 'Amazon Bedrock', desc: 'Fully managed service to access and build generative AI applications on top of high-performing foundation models from Amazon, Anthropic, Meta, and others, without managing any infrastructure.', example: 'aws bedrock list-foundation-models --by-provider anthropic' },
              { name: 'Amazon Titan', desc: "Amazon's own family of foundation models for text generation, embeddings, and image generation, available through Bedrock alongside third-party models.", example: 'aws bedrock-runtime invoke-model --model-id amazon.titan-text-express-v1 --body file://input.json output.json' },
              { name: 'Guardrails for Amazon Bedrock', desc: 'Adds configurable safety filters — content filtering, PII redaction, denied topics — in front of any foundation model used through Bedrock.', example: 'aws bedrock create-guardrail --name my-guardrail --blocked-input-messaging "blocked" --blocked-outputs-messaging "blocked"' },
              { name: 'Knowledge Bases for Amazon Bedrock', desc: 'Connects foundation models to your own data sources for retrieval-augmented generation, without building a custom vector search pipeline.', example: 'aws bedrock-agent create-knowledge-base --name my-kb --role-arn <arn> --knowledge-base-configuration file://kb-config.json' },
              { name: 'Amazon Q', desc: 'Generative AI-powered assistant embedded across AWS — the console, IDEs, QuickSight — for answering questions, writing code, and analyzing data in natural language.', example: 'q chat "how do I create an S3 bucket with versioning enabled?"' },
              { name: 'SageMaker', desc: 'End-to-end platform to build, train, and deploy machine learning models at scale, covering everything from notebooks and managed training jobs to hosted inference endpoints.', example: 'aws sagemaker create-training-job --training-job-name my-job --cli-input-json file://train.json' },
              { name: 'Rekognition', desc: 'Pre-trained computer vision models for image and video analysis — object detection, facial recognition, content moderation — accessible via a simple API call.', example: 'aws rekognition detect-labels --image \'{"S3Object":{"Bucket":"b","Name":"img.jpg"}}\'' },
              { name: 'Comprehend', desc: 'Natural language processing service that extracts sentiment, entities, key phrases, and language from text, without training your own NLP model.', example: 'aws comprehend detect-sentiment --text "I love this" --language-code en' },
              { name: 'Lex', desc: 'Builds conversational chatbots and voice interfaces using the same speech-recognition and natural-language-understanding engine that powers Amazon Alexa.', example: 'aws lexv2-models create-bot --bot-name my-bot --cli-input-json file://bot.json' },
              { name: 'Polly', desc: 'Converts written text into lifelike speech in dozens of languages and voices, usable for anything from accessibility features to automated phone systems.', example: 'aws polly synthesize-speech --text "Hello" --voice-id Joanna --output-format mp3 out.mp3' },
              { name: 'Textract', desc: 'Extracts text, tables, and form data from scanned documents automatically, going beyond plain OCR by understanding the structure of forms and tables.', example: 'aws textract detect-document-text --document \'{"S3Object":{"Bucket":"b","Name":"doc.pdf"}}\'' },
              { name: 'Transcribe', desc: 'Converts speech to accurate, punctuated text in real time or from recorded audio, with support for speaker identification and custom vocabularies.', example: 'aws transcribe start-transcription-job --transcription-job-name my-job --media MediaFileUri=s3://bucket/audio.mp3 --language-code en-US' },
              { name: 'Translate', desc: 'Neural machine translation between dozens of languages, usable as a real-time API call for translating UI text, documents, or support tickets.', example: 'aws translate translate-text --text "Hello" --source-language-code en --target-language-code es' },
              { name: 'Personalize', desc: 'Builds real-time recommendation systems using the same ML technology behind Amazon.com, without needing your own ML expertise to train the models.', example: 'aws personalize create-solution --name my-solution --recipe-arn arn:aws:personalize:::recipe/aws-user-personalization' },
              { name: 'Forecast', desc: 'Generates accurate time-series forecasts — demand, inventory, financial metrics — using the same forecasting technology Amazon uses internally.', example: 'aws forecast create-predictor --predictor-name my-predictor --forecast-horizon 30 --input-data-config file://config.json' },
            ],
          },
          {
            label: 'Containers',
            items: [
              { name: 'ECR', desc: 'Fully managed container image registry integrated with IAM and ECS/EKS, scanning images for vulnerabilities automatically on push.', example: 'aws ecr create-repository --repository-name my-repo' },
              { name: 'App Mesh', desc: 'Service mesh that provides consistent observability, traffic control, and mTLS encryption between microservices without changing application code.', example: 'aws appmesh create-mesh --mesh-name my-mesh' },
              { name: 'Cloud Map', desc: 'Service discovery for cloud resources, letting applications look up the dynamic IP addresses of dependent services by name instead of hardcoding endpoints.', example: 'aws servicediscovery create-service --name my-service --namespace-id ns-1234' },
              { name: 'Proton', desc: 'Automated management platform for container and serverless deployments, letting platform teams publish golden-path templates other teams deploy from.', example: 'aws proton create-service --name my-service --spec-file spec.yaml' },
            ],
          },
          {
            label: 'Migration & Transfer',
            items: [
              { name: 'Application Migration Service (MGN)', desc: 'Automates lift-and-shift migration of physical, virtual, and cloud servers to AWS with minimal downtime, continuously replicating source servers in the background.', example: 'aws mgn start-replication --source-server-id s-1234567890abcdef0' },
              { name: 'Database Migration Service (DMS)', desc: 'Migrates databases to AWS with minimal downtime, supporting both homogeneous and heterogeneous engine migrations while the source database stays operational.', example: 'aws dms create-replication-instance --replication-instance-identifier my-instance --replication-instance-class dms.t3.medium' },
              { name: 'Transfer Family', desc: 'Fully managed SFTP, FTPS, and FTP file transfer directly into and out of S3 or EFS, without standing up and patching your own file transfer servers.', example: 'aws transfer create-server --protocols SFTP' },
              { name: 'DataSync', desc: 'Automates and accelerates moving large datasets between on-premises storage and AWS, or between AWS storage services, without writing custom transfer scripts.', example: 'aws datasync create-task --source-location-arn <arn> --destination-location-arn <arn>' },
              { name: 'Migration Hub', desc: 'Central place to track the status of application migrations across multiple AWS and partner migration tools, instead of checking each tool separately.', example: 'aws migrationhub-config describe-home-region-controls' },
            ],
          },
          {
            label: 'End User Computing',
            items: [
              { name: 'WorkSpaces', desc: 'Fully managed virtual desktops (DaaS) that users access from any device, provisioned in minutes instead of racking and imaging physical hardware.', example: 'aws workspaces create-workspaces --cli-input-json file://workspaces.json' },
              { name: 'AppStream 2.0', desc: 'Streams individual desktop applications from AWS to a browser without installing anything locally, commonly used to deliver legacy Windows apps as SaaS.', example: 'aws appstream create-fleet --name my-fleet --instance-type stream.standard.medium --image-name my-image' },
              { name: 'WorkSpaces Secure Browser', desc: 'Fully managed, isolated browser experience for accessing internal web apps securely from unmanaged devices, without requiring a VPN.', example: 'aws workspaces-web create-portal --display-name my-portal' },
            ],
          },
          {
            label: 'Media Services',
            items: [
              { name: 'Elemental MediaConvert', desc: 'File-based video transcoding service that converts media into formats and bitrates optimized for different target devices and networks.', example: 'aws mediaconvert create-job --cli-input-json file://job.json' },
              { name: 'Elemental MediaLive', desc: 'Live video encoding service that converts live input streams in real time into formats suitable for broadcast and streaming delivery.', example: 'aws medialive create-channel --cli-input-json file://channel.json' },
              { name: 'Elemental MediaPackage', desc: 'Prepares and protects video content for internet delivery, handling packaging and DRM for both live and on-demand streams.', example: 'aws mediapackage create-channel --id my-channel' },
              { name: 'Interactive Video Service (IVS)', desc: 'Fully managed, low-latency live streaming built for interactive video experiences, without having to operate your own streaming infrastructure.', example: 'aws ivs create-channel --name my-channel' },
            ],
          },
          {
            label: 'Business Applications',
            items: [
              { name: 'Amazon Connect', desc: 'Cloud contact center that lets you stand up an omnichannel customer service operation in minutes, with no telephony hardware to install.', example: 'aws connect create-instance --identity-management-type CONNECT_MANAGED --inbound-calls-enabled --outbound-calls-enabled' },
              { name: 'WorkMail', desc: 'Managed business email and calendar service compatible with existing desktop and mobile email clients, with built-in encryption and compliance controls.', example: 'aws workmail create-organization --alias my-org' },
              { name: 'Chime SDK', desc: 'Embeds real-time audio, video, and messaging directly into your own applications, built on the same infrastructure that powers Amazon Chime.', example: 'aws chime-sdk-meetings create-meeting --client-request-token token1 --media-region us-east-1' },
            ],
          },
          {
            label: 'Front-End Web & Mobile',
            items: [
              { name: 'Amplify', desc: 'Builds and deploys full-stack web and mobile apps quickly, bundling hosting, CI/CD, auth, and a GraphQL API into one streamlined workflow.', example: 'amplify init' },
              { name: 'AppSync', desc: 'Managed GraphQL and pub/sub API service that connects apps to data sources like DynamoDB or Lambda, with real-time subscriptions built in.', example: 'aws appsync create-graphql-api --name my-api --authentication-type API_KEY' },
              { name: 'Device Farm', desc: 'Tests mobile and web apps across real physical devices in the cloud, without buying and maintaining your own device lab.', example: 'aws devicefarm create-project --name my-project' },
              { name: 'Amazon Location Service', desc: 'Adds maps, place search, geocoding, and asset tracking to applications without displaying or licensing a separate mapping provider directly.', example: 'aws location create-map --map-name my-map --configuration file://config.json' },
            ],
          },
          {
            label: 'Internet of Things',
            items: [
              { name: 'IoT Core', desc: 'Connects billions of IoT devices to the cloud and to each other securely, handling device messaging, device shadows, and rules-based routing.', example: 'aws iot create-thing --thing-name my-device' },
              { name: 'IoT Greengrass', desc: 'Extends AWS to edge devices, letting them run local compute, messaging, and ML inference even while disconnected from the cloud.', example: 'aws greengrassv2 create-deployment --target-arn <arn> --deployment-name my-deployment' },
              { name: 'IoT Analytics', desc: 'Collects, processes, and analyzes IoT device data at scale, filtering out the noise typical of raw sensor data before it reaches storage.', example: 'aws iotanalytics create-channel --channel-name my-channel' },
              { name: 'IoT SiteWise', desc: 'Collects and organizes industrial equipment data at scale, modeling physical assets so operational data can be queried consistently across a factory floor.', example: 'aws iotsitewise create-asset-model --asset-model-name my-model' },
            ],
          },
        ],
      },
      {
        slug: 'azure',
        name: 'Azure',
        logo: 'azure',
        desc: 'Microsoft\'s cloud platform, strong in enterprise identity (Entra ID), hybrid cloud, and .NET-centric workloads.',
        concepts: ['Resource Groups — logical containers', 'Virtual Machines', 'Entra ID (Azure AD) — identity', 'AKS — managed Kubernetes', 'ARM templates / Bicep — IaC'],
        install: [
          { platform: 'macOS (Homebrew)', command: 'brew install azure-cli' },
          { platform: 'Linux', command: 'curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash' },
          { platform: 'Windows', command: 'winget install -e --id Microsoft.AzureCLI' },
        ],
        commands: ['az login', 'az group create -n <rg> -l <region>', 'az vm list', 'az aks get-credentials --name <cluster> --resource-group <rg>'],
        services: [
          {
            label: 'Compute',
            items: [
              { name: 'Virtual Machines', desc: 'On-demand, scalable virtual machines with a huge range of sizes and OS images — Azure\'s equivalent of EC2, and the base compute unit most Azure services build on.', example: 'az vm create -n myVM -g myRG --image Ubuntu2204' },
              { name: 'AKS', desc: 'Managed Kubernetes control plane on Azure — Microsoft runs and patches the control plane, you manage the node pools, making it the standard way to run Kubernetes on Azure.', example: 'az aks create -n myAKS -g myRG --node-count 3' },
              { name: 'App Service', desc: 'Fully managed hosting for web apps, APIs, and mobile backends with built-in autoscaling, deployment slots, and CI/CD integration, without managing the underlying VMs.', example: 'az webapp up -n myapp --runtime "NODE:18-lts"' },
              { name: 'Azure Functions', desc: 'Event-driven serverless compute that runs code in response to triggers — HTTP calls, timers, queue messages — billed only for actual execution time.', example: 'az functionapp create -n myfunc -g myRG --consumption-plan-location eastus --runtime node' },
              { name: 'Container Instances', desc: 'Runs individual containers directly on Azure without provisioning VMs or managing a cluster, useful for quick, isolated container workloads or burst capacity.', example: 'az container create -n mycontainer -g myRG --image nginx' },
              { name: 'Azure Container Apps', desc: 'Serverless container platform with built-in autoscaling (including scale-to-zero) and Dapr integration, sitting between Container Instances and full AKS in complexity.', example: 'az containerapp create -n myapp -g myRG --image myimage:latest' },
              { name: 'Virtual Machine Scale Sets', desc: 'Automatically scales groups of identical, load-balanced VMs up or down based on demand or a schedule, the building block behind many of Azure\'s managed compute services.', example: 'az vmss create -n myScaleSet -g myRG --image Ubuntu2204 --instance-count 3' },
            ],
          },
          {
            label: 'Storage',
            items: [
              { name: 'Blob Storage', desc: 'Massively scalable object storage for unstructured data — images, video, backups, logs — with hot, cool, and archive tiers to balance cost against access frequency.', example: 'az storage blob upload --account-name mystorage -c mycontainer -f file.txt -n file.txt' },
              { name: 'Azure Disk / Files Storage', desc: 'Managed block disks for VM storage plus SMB/NFS file shares that can be mounted concurrently from multiple machines, on-prem or in Azure.', example: 'az disk create -n myDisk -g myRG --size-gb 128' },
            ],
          },
          {
            label: 'Database',
            items: [
              { name: 'Azure SQL Database', desc: 'Fully managed SQL Server-compatible relational database with automatic patching, backups, and scaling, removing the operational overhead of running SQL Server yourself.', example: 'az sql db create -n mydb -g myRG -s myserver --service-objective S0' },
              { name: 'Cosmos DB', desc: 'Globally distributed, multi-model database supporting document, key-value, graph, and column-family APIs with single-digit-millisecond latency at any scale.', example: 'az cosmosdb create -n mycosmos -g myRG' },
              { name: 'Azure Database for MySQL/PostgreSQL', desc: 'Managed MySQL and PostgreSQL databases with automated patching, backups, and high availability, for teams standardized on open-source relational engines.', example: 'az postgres flexible-server create -n mypg -g myRG' },
              { name: 'Azure Cache for Redis', desc: 'Managed Redis instance for caching and session storage, cutting read latency dramatically for data that is expensive to fetch from a primary database repeatedly.', example: 'az redis create -n myredis -g myRG --sku Basic --vm-size c0' },
            ],
          },
          {
            label: 'Networking',
            items: [
              { name: 'Virtual Network', desc: 'Isolated private network for Azure resources — define address spaces, subnets, and routing rules, and connect it to on-premises networks via VPN or ExpressRoute.', example: 'az network vnet create -n myVNet -g myRG --address-prefix 10.0.0.0/16' },
              { name: 'Azure DNS & Traffic Manager', desc: 'Managed DNS hosting paired with DNS-based global traffic routing, directing users to the closest or healthiest regional endpoint for your application.', example: 'az network dns zone create -n example.com -g myRG' },
              { name: 'Load Balancer / App Gateway', desc: 'Layer-4 load balancing across VMs and services, distributing TCP/UDP traffic for high availability and throughput at the network level.', example: 'az network lb create -n myLB -g myRG' },
              { name: 'Application Gateway', desc: 'Layer-7 (HTTP/HTTPS) load balancer with URL-based routing, SSL termination, and an integrated web application firewall for filtering malicious requests.', example: 'az network application-gateway create -n myAppGw -g myRG --sku Standard_v2' },
              { name: 'ExpressRoute', desc: 'Private, dedicated network connection from your on-premises infrastructure into Azure, bypassing the public internet for predictable latency and bandwidth.', example: 'az network express-route create -n myCircuit -g myRG --bandwidth 200 --provider "Equinix" --peering-location "Silicon Valley"' },
              { name: 'Azure Bastion', desc: 'Provides secure RDP/SSH access to VMs directly through the Azure portal over TLS, so you never need to expose a public IP or open inbound ports on the VM.', example: 'az network bastion create -n myBastion -g myRG --vnet-name myVNet --public-ip-address myBastionIp' },
              { name: 'Azure Firewall', desc: 'Managed, cloud-native network firewall that filters traffic in and out of virtual networks, with built-in high availability and threat intelligence-based filtering.', example: 'az network firewall create -n myFirewall -g myRG' },
            ],
          },
          {
            label: 'Security & Identity',
            items: [
              { name: 'Entra ID (Azure AD)', desc: 'Microsoft\'s identity platform — single sign-on, multi-factor authentication, and access management for both Azure resources and thousands of third-party SaaS apps.', example: 'az ad user create --display-name "Jane" --user-principal-name jane@contoso.com --password <pwd>' },
              { name: 'Key Vault', desc: 'Securely stores and manages secrets, encryption keys, and certificates, with fine-grained access policies and audit logging for every access.', example: 'az keyvault secret set --vault-name myKV -n dbPassword --value "s3cret"' },
              { name: 'Defender for Cloud', desc: 'Continuously assesses your cloud security posture and provides threat protection across Azure, hybrid, and multi-cloud workloads, with actionable hardening recommendations.', example: 'az security auto-provisioning-setting update -n default --auto-provision on' },
              { name: 'Sentinel', desc: 'Cloud-native SIEM and SOAR platform that aggregates security signals across your environment, using analytics and automation to detect and respond to threats.', example: 'az sentinel data-connector list -g myRG --workspace-name myWorkspace' },
            ],
          },
          {
            label: 'Management & Governance',
            items: [
              { name: 'Monitor', desc: 'Collects metrics, logs, and traces across Azure resources and applications, with alerting and dashboards for observing the health of your environment.', example: 'az monitor metrics list --resource <resourceId> --metric "Percentage CPU"' },
              { name: 'Azure Monitor Log Analytics', desc: 'Centralized log store queried with KQL (Kusto Query Language), letting you correlate logs across many resources in one workspace instead of hunting per-service.', example: 'az monitor log-analytics query -w <workspaceId> --analytics-query "AzureActivity | take 10"' },
              { name: 'Azure Policy', desc: 'Enforces organizational rules across resources — for example requiring encryption or restricting VM sizes — and can audit or automatically remediate non-compliant resources.', example: 'az policy assignment create --policy <policyId> -n myAssignment' },
              { name: 'Cost Management', desc: 'Tracks, analyzes, and forecasts cloud spend across subscriptions, with budgets and alerts to catch cost overruns before the bill arrives.', example: 'az costmanagement query --type Usage --timeframe MonthToDate --scope /subscriptions/<id>' },
              { name: 'Azure Backup & Site Recovery', desc: 'Backs up VMs, databases, and files, and replicates entire workloads to a secondary region for disaster recovery with orchestrated failover.', example: 'az backup vault create -n myVault -g myRG -l eastus' },
              { name: 'Azure Resource Manager (ARM)', desc: 'The deployment and management layer underlying every Azure resource — every portal action, CLI command, or Bicep/ARM template ultimately goes through it.', example: 'az deployment group create -g myRG --template-file template.json' },
            ],
          },
          {
            label: 'Integration & Messaging',
            items: [
              { name: 'Service Bus', desc: 'Managed enterprise messaging with queues and publish/subscribe topics, supporting features like sessions and dead-lettering for reliable, ordered message delivery.', example: 'az servicebus queue create -n myqueue --namespace-name myns -g myRG' },
              { name: 'Event Grid', desc: 'Fully managed event routing service that reacts to events from Azure services or custom sources and delivers them to subscribers, powering event-driven architectures.', example: 'az eventgrid topic create -n mytopic -g myRG' },
              { name: 'Logic Apps', desc: 'Low-code workflow automation with hundreds of prebuilt connectors, letting you wire together Azure services and third-party SaaS apps visually instead of writing glue code.', example: 'az logic workflow create -n myworkflow -g myRG --definition workflow.json' },
            ],
          },
          {
            label: 'DevOps',
            items: [
              { name: 'ARM Templates / Bicep', desc: 'Native infrastructure-as-code for Azure — ARM templates are JSON, Bicep is a cleaner DSL that compiles down to ARM — both declare resources for repeatable deployments.', example: 'az bicep build --file main.bicep' },
              { name: 'Azure DevOps', desc: 'Suite covering work-item boards, Git repos, CI/CD pipelines, and package artifacts — an all-in-one alternative to stitching together separate CI/CD tools.', example: 'az devops project create --name myproject' },
              { name: 'Azure Pipelines', desc: 'CI/CD pipeline service configurable via YAML or a visual classic editor, running builds and deployments across Windows, Linux, and macOS agents.', example: 'az pipelines create --name mypipeline --repository myrepo --yml-path azure-pipelines.yml' },
            ],
          },
          {
            label: 'Data & Analytics',
            items: [
              { name: 'Azure Data Factory', desc: 'Managed ETL and data-integration service that orchestrates moving and transforming data across on-prem and cloud sources on a schedule or trigger.', example: 'az datafactory create -n myADF -g myRG' },
              { name: 'Azure Synapse Analytics', desc: 'Unifies data warehousing and big-data analytics in one workspace, combining SQL pools, Spark pools, and pipelines so you do not need separate tools for each.', example: 'az synapse workspace create -n mysynapse -g myRG --storage-account mystorage --sql-admin-login-user admin' },
              { name: 'Azure Databricks', desc: 'Managed Apache Spark analytics platform built with Databricks, tightly integrated with Azure identity and storage for large-scale data engineering and ML workloads.', example: 'az databricks workspace create -n mydatabricks -g myRG --sku standard' },
            ],
          },
          {
            label: 'AI',
            items: [
              { name: 'Azure OpenAI Service', desc: "Provides API access to OpenAI's GPT, embedding, and image-generation models with Azure's enterprise security, networking, and regional compliance controls layered on top.", example: 'az cognitiveservices account deployment create -g myRG -n myOpenAI --deployment-name gpt-4 --model-name gpt-4 --model-version "0613" --model-format OpenAI' },
              { name: 'Azure AI Foundry', desc: "Unified studio for building, evaluating, and deploying generative AI applications, bringing Azure OpenAI models, prompt flow, and safety evaluation into one workspace.", example: 'az ml workspace create -n myAIFoundryHub -g myRG --kind hub' },
              { name: 'Azure Machine Learning', desc: 'End-to-end platform for building, training, and deploying ML models, with managed compute, experiment tracking, and MLOps pipelines built in.', example: 'az ml workspace create -n myMLWorkspace -g myRG' },
              { name: 'Azure AI Search', desc: 'Managed search-as-a-service with built-in vector search, commonly used to ground large language models with retrieval-augmented generation over private data.', example: 'az search service create -n mysearch -g myRG --sku Basic' },
              { name: 'Azure Cognitive Services', desc: 'Pre-built AI APIs for vision, speech, and language — plug in a REST call for capabilities like OCR, translation, or sentiment analysis without training your own model.', example: 'az cognitiveservices account create -n mycog -g myRG --kind TextAnalytics --sku S0' },
            ],
          },
          {
            label: 'API Management',
            items: [
              { name: 'Azure API Management', desc: 'Publishes, secures, rate-limits, and monitors APIs through a managed gateway, giving external and internal consumers a consistent, documented front door to backend services.', example: 'az apim create -n myAPIM -g myRG --publisher-email admin@contoso.com --publisher-name "Contoso"' },
            ],
          },
          {
            label: 'Containers',
            items: [
              { name: 'Azure Container Registry', desc: 'Private registry for storing and managing container images and Helm charts, integrated with AKS and Azure DevOps for build-to-deploy pipelines.', example: 'az acr create -n myRegistry -g myRG --sku Basic' },
              { name: 'Azure Kubernetes Fleet Manager', desc: 'Centrally manages and orchestrates updates and configuration across many AKS clusters as a single fleet, rather than one cluster at a time.', example: 'az fleet create -g myRG -n myfleet -l eastus' },
              { name: 'Service Fabric', desc: 'Distributed systems platform for packaging, deploying, and managing microservices and containers, predating AKS as Microsoft\'s original container orchestrator.', example: 'az sf cluster create -g myRG --cluster-name mycluster' },
              { name: 'Azure Red Hat OpenShift', desc: 'Fully managed OpenShift clusters jointly operated by Microsoft and Red Hat, for teams standardized on the OpenShift platform.', example: 'az aro create -g myRG -n mycluster --vnet myvnet --master-subnet master-subnet --worker-subnet worker-subnet' },
            ],
          },
          {
            label: 'Migration',
            items: [
              { name: 'Azure Migrate', desc: 'Centralized hub for discovering, assessing, and migrating on-premises servers, databases, and apps to Azure.', example: 'az migrate project create -n myproject -g myRG --location eastus' },
              { name: 'Azure Database Migration Service', desc: 'Migrates databases to Azure with minimal downtime, handling schema and data migration for both homogeneous and heterogeneous engines.', example: 'az dms create -g myRG -n myservice -l eastus --sku-name Basic_2vCores' },
              { name: 'Azure Data Box', desc: 'Physically ships a hardened storage appliance to transfer very large offline datasets into Azure when network transfer would take too long.', example: 'az databox job create -g myRG -n myjob -l eastus --sku DataBox' },
            ],
          },
          {
            label: 'IoT & Digital Twins',
            items: [
              { name: 'IoT Hub', desc: 'Central message hub for bi-directional communication between IoT devices and the cloud, handling device provisioning, security, and telemetry ingestion.', example: 'az iot hub create -n myhub -g myRG' },
              { name: 'IoT Central', desc: 'Fully managed SaaS app platform for IoT, letting you build device-management dashboards without operating the underlying IoT Hub infrastructure directly.', example: 'az iot central app create -n myapp -g myRG --subdomain my-app' },
              { name: 'Azure Digital Twins', desc: 'Models real-world environments — buildings, factories, cities — as a live graph of connected digital twins for simulation and monitoring.', example: 'az dt create -n mytwins -g myRG -l eastus' },
            ],
          },
          {
            label: 'Virtual Desktop',
            items: [
              { name: 'Azure Virtual Desktop', desc: 'Delivers Windows desktops and apps as managed virtual desktop infrastructure, streamed to any device without hosting your own RDS farm.', example: 'az desktopvirtualization workspace create -n myworkspace -g myRG' },
              { name: 'Windows 365', desc: 'Provisions a Cloud PC — a full, persistent Windows desktop streamed from Microsoft\'s cloud — billed per user rather than per session like Azure Virtual Desktop.', example: 'Configured via the Microsoft 365 admin center or Intune (no dedicated az CLI command)' },
            ],
          },
          {
            label: 'Media',
            items: [
              { name: 'Azure Media Services', desc: 'Encodes, packages, and streams video and audio at scale, handling formats and DRM for both live and on-demand content delivery.', example: 'az ams account create -n myaccount -g myRG --storage-account mystorage' },
            ],
          },
          {
            label: 'Hybrid + Multicloud',
            items: [
              { name: 'Azure Arc', desc: 'Extends Azure management — policy, monitoring, RBAC — to servers, Kubernetes clusters, and data services running outside Azure, including on-prem and other clouds.', example: 'az connectedmachine connect --resource-group myRG --location eastus' },
            ],
          },
        ],
      },
      {
        slug: 'google-cloud',
        name: 'Google Cloud',
        logo: 'googlecloud',
        desc: 'Data- and analytics-first cloud platform; GKE is widely considered the most mature managed Kubernetes offering.',
        concepts: ['Compute Engine — VMs', 'Cloud Storage', 'GKE — managed Kubernetes', 'BigQuery — data warehouse', 'IAM — identity & permissions'],
        install: [
          { platform: 'macOS (Homebrew)', command: 'brew install --cask google-cloud-sdk' },
          { platform: 'Linux', command: 'curl https://sdk.cloud.google.com | bash' },
          { platform: 'Windows', command: 'winget install Google.CloudSDK' },
        ],
        commands: ['gcloud auth login', 'gcloud config set project <id>', 'gcloud compute instances list', 'gcloud container clusters get-credentials <cluster>'],
        services: [
          {
            label: 'Compute',
            items: [
              { name: 'Compute Engine', desc: 'Highly configurable virtual machines — custom machine types let you pick exact vCPU-to-memory ratios instead of choosing from fixed instance sizes.', example: 'gcloud compute instances create my-vm --machine-type e2-medium --zone us-central1-a' },
              { name: 'GKE', desc: 'Managed Kubernetes clusters with the deepest automation of any major cloud — Autopilot mode handles node provisioning and scaling entirely, widely seen as the most mature managed Kubernetes offering.', example: 'gcloud container clusters create my-cluster --num-nodes 3' },
              { name: 'Cloud Run', desc: 'Fully managed serverless platform that runs stateless containers and scales them to zero automatically, billing only for the CPU time actually used while handling requests.', example: 'gcloud run deploy my-app --image gcr.io/project/image --platform managed' },
              { name: 'Cloud Functions', desc: 'Event-driven serverless functions triggered by HTTP requests, Pub/Sub messages, or storage events, without managing any underlying infrastructure.', example: 'gcloud functions deploy my-fn --runtime nodejs20 --trigger-http' },
              { name: 'App Engine', desc: 'Fully managed platform-as-a-service for web apps with minimal ops — deploy source code and Google handles scaling, patching, and load balancing automatically.', example: 'gcloud app deploy' },
            ],
          },
          {
            label: 'Storage',
            items: [
              { name: 'Cloud Storage', desc: 'Object storage with configurable storage classes (Standard, Nearline, Coldline, Archive) that trade access frequency for cost, all under one unified API and bucket namespace.', example: 'gsutil cp file.txt gs://my-bucket/' },
              { name: 'Persistent Disk', desc: 'Durable network-attached block storage for Compute Engine VMs, with snapshotting and the ability to resize volumes without downtime.', example: 'gcloud compute disks create my-disk --size 100GB --zone us-central1-a' },
              { name: 'Filestore', desc: 'Managed NFS file storage for workloads that need a shared file system mounted across multiple VMs or GKE pods simultaneously.', example: 'gcloud filestore instances create my-nfs --zone us-central1-a --tier STANDARD --file-share name=vol1,capacity=1TB' },
            ],
          },
          {
            label: 'Database',
            items: [
              { name: 'Cloud SQL', desc: 'Managed MySQL, PostgreSQL, and SQL Server instances with automated backups, replication, and patching, for teams that want a standard relational engine without the ops burden.', example: 'gcloud sql instances create my-db --database-version POSTGRES_15 --tier db-f1-micro' },
              { name: 'Cloud Spanner', desc: 'Globally distributed relational database that offers strong consistency and horizontal scale simultaneously — a combination most distributed databases have to trade off.', example: 'gcloud spanner instances create my-spanner --config regional-us-central1 --nodes 1' },
              { name: 'Bigtable', desc: 'Managed wide-column NoSQL database built for huge analytical and operational workloads — the same engine that powers Google Search and Maps internally.', example: 'gcloud bigtable instances create my-bt --cluster my-cluster --cluster-zone us-central1-a' },
              { name: 'Firestore', desc: 'Managed NoSQL document database with real-time sync and offline support, popular for mobile and web apps that need live-updating data without custom backend code.', example: 'gcloud firestore databases create --location us-central' },
              { name: 'Memorystore', desc: 'Fully managed Redis or Memcached instances for caching and session storage, without having to provision or patch the underlying cache servers yourself.', example: 'gcloud redis instances create my-redis --size 1 --region us-central1' },
            ],
          },
          {
            label: 'Networking',
            items: [
              { name: 'VPC', desc: 'Virtual network that is global by default — a single VPC can span all regions worldwide, unlike the region-scoped VPCs of other clouds.', example: 'gcloud compute networks create my-vpc --subnet-mode auto' },
              { name: 'Cloud Load Balancing', desc: 'Global, software-defined load balancing that fronts traffic with a single anycast IP and routes it to the closest healthy backend anywhere in the world.', example: 'gcloud compute forwarding-rules create my-fwd-rule --global --target-http-proxy my-proxy' },
              { name: 'Cloud DNS', desc: 'Managed, highly available DNS hosting built on the same infrastructure that serves Google\'s own domains, with a 100% uptime SLA.', example: 'gcloud dns managed-zones create my-zone --dns-name example.com --description "my zone"' },
              { name: 'Cloud CDN', desc: 'Caches content at Google\'s global edge locations, working directly with Cloud Load Balancing to speed up delivery of static and dynamic content to end users.', example: 'gcloud compute backend-services update my-backend --enable-cdn' },
              { name: 'Cloud NAT', desc: 'Provides outbound-only internet access for instances with no public IP, so private VMs can reach external services without being reachable from the internet.', example: 'gcloud compute routers nats create my-nat --router my-router --auto-allocate-nat-external-ips' },
              { name: 'Cloud Armor', desc: 'DDoS protection and web application firewall enforced at Google\'s network edge, blocking malicious traffic before it ever reaches your load balancer or backend.', example: 'gcloud compute security-policies create my-policy' },
            ],
          },
          {
            label: 'Security & Identity',
            items: [
              { name: 'IAM', desc: 'Fine-grained access control across every Google Cloud resource, using roles and policies to define exactly who can do what, scoped down to individual resources.', example: 'gcloud projects add-iam-policy-binding my-project --member user:jane@example.com --role roles/editor' },
              { name: 'Secret Manager', desc: 'Securely stores API keys, passwords, and certificates with automatic versioning and IAM-based access control, so secrets never end up hard-coded in source.', example: 'gcloud secrets create my-secret --data-file=secret.txt' },
              { name: 'Security Command Center', desc: 'Centralized dashboard surfacing security findings, vulnerabilities, and misconfigurations across your entire Google Cloud footprint in one place.', example: 'gcloud scc findings list my-org-id' },
              { name: 'Cloud KMS', desc: 'Managed storage, rotation, and auditing of encryption keys, integrated with Cloud Storage, BigQuery, and most other services for encrypting data at rest.', example: 'gcloud kms keys create my-key --location global --keyring my-ring --purpose encryption' },
              { name: 'Certificate Manager', desc: 'Provisions and manages TLS certificates for load balancers and custom domains, including automatic renewal so certificates never silently expire.', example: 'gcloud certificate-manager certificates create my-cert --domains example.com' },
            ],
          },
          {
            label: 'Management & Governance',
            items: [
              { name: 'Cloud Monitoring & Logging', desc: 'Collects metrics, dashboards, and centralized logs across your Google Cloud and hybrid resources, with alerting policies to catch issues before users notice.', example: 'gcloud logging read "resource.type=gce_instance" --limit 10' },
              { name: 'Deployment Manager', desc: 'Google Cloud\'s native infrastructure-as-code service, declaring resources in YAML templates that are created, updated, or deleted as a single deployment.', example: 'gcloud deployment-manager deployments create my-deployment --config config.yaml' },
            ],
          },
          {
            label: 'Data & Analytics',
            items: [
              { name: 'BigQuery', desc: 'Serverless data warehouse that runs SQL queries over petabytes of data in seconds, with no clusters to size or manage — you pay per query or per flat-rate slot.', example: 'bq query --use_legacy_sql=false "SELECT * FROM dataset.table LIMIT 10"' },
              { name: 'Pub/Sub', desc: 'Global, durable messaging service for event-driven systems, decoupling publishers from subscribers at massive scale with at-least-once delivery guarantees.', example: 'gcloud pubsub topics publish my-topic --message "hello"' },
              { name: 'Dataflow', desc: 'Managed stream and batch data processing built on Apache Beam, using the same pipeline code for both real-time and historical data with autoscaling workers.', example: 'gcloud dataflow jobs run my-job --gcs-location gs://template/path' },
              { name: 'Cloud Composer', desc: 'Managed Apache Airflow environment for orchestrating complex data workflows as DAGs, without having to run and scale your own Airflow infrastructure.', example: 'gcloud composer environments create my-env --location us-central1' },
              { name: 'Dataproc', desc: 'Managed Spark and Hadoop clusters that spin up in minutes and can be torn down after a job finishes, cheaper than running always-on big-data clusters.', example: 'gcloud dataproc clusters create my-cluster --region us-central1' },
              { name: 'Looker / Looker Studio', desc: 'BI dashboards and data visualization tools — Looker Studio for free, drag-and-drop reports, Looker for a governed enterprise semantic layer over your data.', example: 'Connect a BigQuery dataset as a Looker Studio data source (web UI, no CLI)' },
            ],
          },
          {
            label: 'Developer Tools',
            items: [
              { name: 'Cloud Build', desc: 'Managed CI/CD service that builds, tests, and deploys code in containers, triggered automatically by commits to your source repository.', example: 'gcloud builds submit --tag gcr.io/project/image' },
              { name: 'Artifact Registry', desc: 'Stores and manages container images and language packages (npm, Maven, Python, etc.) in one place, with vulnerability scanning and fine-grained access control.', example: 'gcloud artifacts repositories create my-repo --repository-format docker --location us-central1' },
            ],
          },
          {
            label: 'AI/ML',
            items: [
              { name: 'Vertex AI Gemini API', desc: "Access to Google's Gemini family of multimodal generative AI models for text, code, image, and video understanding, callable directly from Vertex AI.", example: 'gcloud ai models list --region=us-central1 --filter="displayName:gemini*"' },
              { name: 'Vertex AI Model Garden', desc: 'A curated catalog of foundation models — Google\'s own, open-source, and third-party — that can be deployed straight to a Vertex AI endpoint without hunting for weights separately.', example: 'gcloud ai model-garden models list --region=us-central1' },
              { name: 'Vertex AI Search', desc: 'Adds Google-quality semantic search and retrieval-augmented generation over your own documents, without building a separate vector database and ranking pipeline.', example: 'gcloud alpha discovery-engine data-stores create my-datastore --location=global --industry-vertical=GENERIC' },
              { name: 'Vertex AI', desc: 'Unified platform that consolidates Google Cloud\'s ML tools — training, tuning, deployment, and pipelines — into one workflow instead of separate disconnected services.', example: 'gcloud ai custom-jobs create --region us-central1 --config job.yaml' },
              { name: 'Cloud Vision / Speech / NLP APIs', desc: 'Pre-trained ML APIs for images, speech, and text — object detection, speech-to-text, sentiment analysis — usable via API call with no model training required.', example: 'gcloud ml vision detect-labels image.jpg' },
            ],
          },
          {
            label: 'App Platform',
            items: [
              { name: 'Firebase', desc: 'Mobile and web app backend-as-a-service bundling authentication, a real-time database, hosting, and analytics, popular for shipping apps fast without a custom backend.', example: 'firebase deploy --only hosting' },
              { name: 'Anthos', desc: 'Manages Kubernetes clusters consistently across on-premises data centers, Google Cloud, and other public clouds from a single control plane.', example: 'gcloud container hub memberships register my-cluster --gke-cluster us-central1-a/my-cluster' },
            ],
          },
          {
            label: 'Containers',
            items: [
              { name: 'Cloud Deploy', desc: 'Managed continuous delivery service that automates deployments to GKE and Cloud Run across a defined progression of environments.', example: 'gcloud deploy apply --file=clouddeploy.yaml --region=us-central1' },
              { name: 'Binary Authorization', desc: 'Enforces that only signed, verified container images can be deployed to GKE or Cloud Run, blocking unverified images at deploy time.', example: 'gcloud container binauthz policy import policy.yaml' },
            ],
          },
          {
            label: 'Migration',
            items: [
              { name: 'Migrate to Virtual Machines', desc: 'Migrates on-premises or other-cloud VMs to Compute Engine with minimal downtime, automating replication and cutover.', example: 'gcloud migration vms sources create my-source --region=us-central1' },
              { name: 'Database Migration Service', desc: 'Migrates MySQL, PostgreSQL, and SQL Server databases into Cloud SQL with minimal downtime.', example: 'gcloud database-migration connection-profiles create mysql my-profile --region=us-central1' },
              { name: 'Storage Transfer Service', desc: 'Automates moving large datasets into, out of, or between cloud storage systems, including from other clouds or on-premises.', example: 'gcloud transfer jobs create gs://source-bucket gs://destination-bucket' },
            ],
          },
          {
            label: 'Media',
            items: [
              { name: 'Transcoder API', desc: 'Converts video files into formats and resolutions optimized for different devices and bandwidths, without managing your own transcoding servers.', example: 'gcloud transcoder jobs create --location=us-central1 --input-uri=gs://bucket/input.mp4 --output-uri=gs://bucket/output/' },
              { name: 'Live Stream API', desc: 'Encodes live video streams in real time into formats suitable for broadcast and streaming delivery.', example: 'gcloud livestream channels create my-channel --location=us-central1 --input-attachments=file://inputs.json' },
            ],
          },
          {
            label: 'API Management',
            items: [
              { name: 'Apigee', desc: 'Full lifecycle API management platform for designing, securing, analyzing, and monetizing APIs at enterprise scale, beyond what a basic gateway offers.', example: 'apigeecli apis create -o my-org -n my-api -f api-spec.yaml' },
            ],
          },
          {
            label: 'Cost Management',
            items: [
              { name: 'Billing Budgets & Alerts', desc: 'Sets budget thresholds and automated alerts on Google Cloud spend, notifying teams before costs run away unnoticed.', example: 'gcloud billing budgets create --billing-account=XXXX-XXXX-XXXX --display-name=my-budget --budget-amount=1000' },
              { name: 'Recommender', desc: 'Analyzes usage patterns and automatically suggests cost, security, and performance optimizations across your resources.', example: 'gcloud recommender recommendations list --recommender=google.compute.instance.MachineTypeRecommender --location=us-central1' },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Infrastructure as Code',
    tools: [
      {
        slug: 'terraform',
        name: 'Terraform',
        logo: 'terraform',
        desc: 'Declarative, provider-agnostic IaC — write infrastructure in HCL, preview the diff, then apply it. State is tracked so Terraform knows what it owns.',
        concepts: ['Providers — AWS/Azure/GCP plugins', 'Resources & data sources', 'State file — tracks real-world resources', 'Modules — reusable configs', 'Plan / apply workflow'],
        install: [
          { platform: 'macOS (Homebrew)', command: 'brew tap hashicorp/tap && brew install hashicorp/tap/terraform' },
          { platform: 'Linux (apt)', command: 'wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg && sudo apt install terraform' },
          { platform: 'Windows', command: 'choco install terraform' },
        ],
        commands: ['terraform init', 'terraform plan', 'terraform apply', 'terraform destroy', 'terraform fmt'],
        services: [
          {
            label: 'Core Concepts',
            items: [
              { name: 'Provider', desc: 'Plugin that talks to a specific API (AWS, Azure, GCP…).', example: 'provider "aws" {\n  region = "us-east-1"\n}\n\nprovider "google" {\n  project = "my-project"\n  region  = "us-central1"\n}' },
              { name: 'Resource', desc: 'A single managed infrastructure object.', example: 'resource "aws_instance" "web" {\n  ami           = "ami-0abcdef"\n  instance_type = "t3.micro"\n}\n\nresource "aws_s3_bucket" "data" {\n  bucket = "my-app-data"\n}' },
              { name: 'Data Source', desc: 'Reads existing, externally managed information.', example: 'data "aws_ami" "latest" {\n  most_recent = true\n  owners      = ["amazon"]\n}\n\ndata "aws_vpc" "default" {\n  default = true\n}' },
              { name: 'Variable', desc: 'Parameterizes configuration for reuse.', example: 'variable "region" {\n  default = "us-east-1"\n}\n\nvariable "instance_count" {\n  type    = number\n  default = 2\n}' },
              { name: 'Output', desc: 'Exposes values from a module after apply.', example: 'output "instance_ip" {\n  value = aws_instance.web.public_ip\n}\n\noutput "bucket_arn" {\n  value     = aws_s3_bucket.data.arn\n  sensitive = false\n}' },
              { name: 'Module', desc: 'Reusable, packaged bundle of resources.', example: 'module "vpc" {\n  source = "./modules/vpc"\n  cidr   = "10.0.0.0/16"\n}\n\nmodule "eks" {\n  source  = "terraform-aws-modules/eks/aws"\n  version = "~> 20.0"\n}' },
              { name: 'State file', desc: 'Maps configuration to real-world resource IDs.', example: 'terraform show terraform.tfstate\n\nterraform state list' },
              { name: 'Backend', desc: 'Where state is stored (S3, Terraform Cloud, local…).', example: 'terraform {\n  backend "s3" {\n    bucket = "my-tf-state"\n    key    = "prod/terraform.tfstate"\n  }\n}\n\nterraform {\n  backend "remote" {\n    organization = "my-org"\n    workspaces { name = "prod" }\n  }\n}' },
              { name: 'Workspace', desc: 'Isolated state for the same config (dev/stage/prod).', example: 'terraform workspace new staging\n\nterraform workspace select staging' },
              { name: 'Provisioner', desc: 'Runs scripts on a resource after creation (escape hatch).', example: 'provisioner "local-exec" {\n  command = "echo done"\n}\n\nprovisioner "remote-exec" {\n  inline = ["sudo apt-get update"]\n}' },
              { name: 'Plan', desc: 'Preview of changes before they\'re applied.', example: 'terraform plan -out=tfplan\n\nterraform plan -destroy' },
              { name: 'Lock file', desc: 'Pins provider versions for reproducible runs.', example: 'terraform providers lock -platform=linux_amd64\n\nterraform init -upgrade  # regenerate .terraform.lock.hcl' },
              { name: 'Import', desc: 'Brings existing infrastructure under Terraform management.', example: 'terraform import aws_instance.web i-0abcdef1234\n\nterraform import \'aws_s3_bucket.data\' my-app-data' },
              { name: 'Taint', desc: 'Marks a resource for forced recreation on next apply.', example: 'terraform taint aws_instance.web\n\nterraform apply -replace="aws_instance.web"  # newer equivalent of taint' },
              { name: 'Local Value', desc: 'Names a repeated expression to avoid duplication.', example: 'locals {\n  name_prefix = "myapp-${var.env}"\n}\n\nresource "aws_instance" "web" {\n  tags = { Name = local.name_prefix }\n}' },
              { name: 'Count / for_each', desc: 'Creates multiple instances of a resource from one block.', example: 'resource "aws_instance" "web" {\n  count = 3\n  ami   = "ami-0abcdef"\n}\n\nresource "aws_s3_bucket" "buckets" {\n  for_each = toset(["logs", "backups"])\n  bucket   = each.key\n}' },
              { name: 'Dynamic Block', desc: 'Generates repeated nested blocks programmatically.', example: 'dynamic "ingress" {\n  for_each = var.ports\n  content {\n    from_port = ingress.value\n  }\n}\n\nresource "aws_security_group" "web" {\n  dynamic "ingress" {\n    for_each = [80, 443]\n    content {\n      from_port = ingress.value\n      to_port   = ingress.value\n      protocol  = "tcp"\n    }\n  }\n}' },
              { name: 'Terraform Registry', desc: 'Public hub for providers and reusable modules.', example: 'terraform init  # pulls from registry.terraform.io automatically\n\nsource = "hashicorp/aws"  # provider pulled from registry.terraform.io' },
              { name: 'Terraform Cloud/Enterprise', desc: 'Hosted runs, remote state, and team collaboration.', example: 'terraform {\n  cloud {\n    organization = "my-org"\n    workspaces { name = "prod" }\n  }\n}\n\nterraform login  # authenticates the CLI against Terraform Cloud' },
              { name: 'Sentinel / OPA', desc: 'Policy-as-code guardrails for what can be applied.', example: 'sentinel apply policy.sentinel\n\nconftest test main.tf.json  # OPA-based policy check' },
              { name: 'Graph', desc: 'Internal dependency graph Terraform builds to order operations.', example: 'terraform graph | dot -Tpng > graph.png\n\nterraform graph -type=plan | dot -Tsvg > plan-graph.svg' },
              { name: 'Refresh', desc: 'Reconciles state with the real infrastructure\'s current status.', example: 'terraform apply -refresh-only\n\nterraform plan -refresh-only' },
              { name: 'Terraform Console', desc: 'Interactive REPL for evaluating expressions.', example: 'terraform console\n> var.region\n\n> aws_instance.web.public_ip' },
            ],
          },
        ],
      },
      {
        slug: 'ansible',
        name: 'Ansible',
        logo: 'ansible',
        desc: 'Agentless configuration management over SSH — push YAML "playbooks" to servers to bring them to a desired, idempotent state.',
        concepts: ['Inventory — hosts to manage', 'Playbooks — YAML task lists', 'Roles — reusable playbook bundles', 'Modules — units of work (copy, apt, service…)', 'Idempotency — safe to re-run'],
        install: [
          { platform: 'macOS (Homebrew)', command: 'brew install ansible' },
          { platform: 'Linux (apt)', command: 'sudo apt update && sudo apt install ansible' },
          { platform: 'pip (any OS)', command: 'python3 -m pip install --user ansible' },
        ],
        commands: ['ansible all -m ping -i inventory', 'ansible-playbook site.yml -i inventory', 'ansible-vault encrypt secrets.yml'],
        services: [
          {
            label: 'Core Concepts',
            items: [
              { name: 'Inventory', desc: 'List of hosts/groups Ansible manages, static or dynamic.', example: '[web]\nweb1.example.com\nweb2.example.com\n\n[web]\nweb[1:3].example.com  # ranges' },
              { name: 'Playbook', desc: 'YAML file defining ordered tasks against hosts.', example: '- hosts: web\n  tasks:\n    - name: install nginx\n      apt: name=nginx state=present\n\nansible-playbook site.yml --limit web1' },
              { name: 'Task', desc: 'A single action, usually one module call.', example: '- name: install nginx\n  apt: name=nginx state=present\n\n- name: ensure service running\n  service: name=nginx state=started enabled=true' },
              { name: 'Module', desc: 'Unit of work — copy, apt, service, template, etc.', example: '- name: copy file\n  copy: src=app.conf dest=/etc/app.conf\n\n- name: template config\n  template: src=app.conf.j2 dest=/etc/app.conf' },
              { name: 'Role', desc: 'Standardized, reusable bundle of tasks/files/handlers.', example: 'roles/webserver/tasks/main.yml\n\nansible-galaxy init roles/webserver' },
              { name: 'Handler', desc: 'Task triggered only when notified (e.g. restart service).', example: 'handlers:\n  - name: restart nginx\n    service: name=nginx state=restarted\n\n- name: install nginx\n  apt: name=nginx state=present\n  notify: restart nginx' },
              { name: 'Template (Jinja2)', desc: 'Generates config files with variable substitution.', example: 'server_name {{ ansible_hostname }};  # inside nginx.conf.j2\n\n{% for user in users %}\n{{ user.name }}\n{% endfor %}' },
              { name: 'Facts', desc: 'Auto-collected system data about each managed host.', example: 'ansible web1 -m setup\n\nansible web1 -m setup -a "filter=ansible_distribution*"' },
              { name: 'Vault', desc: 'Encrypts sensitive variables and files at rest.', example: 'ansible-vault encrypt group_vars/prod/secrets.yml\n\nansible-vault view group_vars/prod/secrets.yml' },
              { name: 'Collection', desc: 'Distributable bundle of roles, modules, and plugins.', example: 'ansible-galaxy collection install community.general\n\nansible-doc -l community.general' },
              { name: 'Ansible Galaxy', desc: 'Public hub for sharing roles and collections.', example: 'ansible-galaxy install geerlingguy.nginx\n\nansible-galaxy collection install amazon.aws' },
              { name: 'AWX / Tower', desc: 'Web UI, scheduling, and RBAC layer over Ansible.', example: 'awx-cli job launch --job-template "Deploy App"\n\nawx-cli job_templates launch "Deploy App" --monitor' },
              { name: 'ansible.cfg', desc: 'Configuration file controlling Ansible\'s default behavior.', example: '[defaults]\ninventory = ./inventory\n\n[privilege_escalation]\nbecome = true\nbecome_method = sudo' },
              { name: 'Variable Precedence', desc: 'Rules for which variable value wins when defined in multiple places.', example: 'ansible-playbook site.yml -e "env=prod"  # extra vars win over all others\n\nansible-playbook site.yml -e @vars.yml  # vars file also overrides defaults' },
              { name: 'Conditionals (when)', desc: 'Runs a task only if a condition evaluates true.', example: 'when: ansible_os_family == "Debian"\n\nwhen: inventory_hostname in groups[\'web\']' },
              { name: 'Loops', desc: 'Repeats a task over a list of items.', example: '- name: install packages\n  apt: name={{ item }}\n  loop: [nginx, git, curl]\n\n- name: create users\n  user: name={{ item.name }} state=present\n  loop: "{{ users }}"' },
              { name: 'Tags', desc: 'Labels tasks so specific subsets can be run selectively.', example: 'ansible-playbook site.yml --tags "web,db"\n\nansible-playbook site.yml --skip-tags "slow"' },
              { name: 'Dynamic Inventory', desc: 'Generates inventory from cloud APIs (AWS, Azure, GCP…).', example: 'ansible-inventory -i aws_ec2.yml --graph\n\nansible-playbook -i aws_ec2.yml site.yml' },
              { name: 'Callback Plugins', desc: 'Customizes how Ansible reports output/events.', example: 'export ANSIBLE_STDOUT_CALLBACK=yaml\n\nexport ANSIBLE_STDOUT_CALLBACK=json' },
              { name: 'Check Mode (--check)', desc: 'Dry-run that reports changes without applying them.', example: 'ansible-playbook site.yml --check --diff\n\nansible-playbook site.yml --check --diff --limit web1' },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Containers & Orchestration',
    tools: [
      {
        slug: 'docker',
        name: 'Docker',
        logo: 'docker',
        desc: 'Packages an application and its dependencies into a portable image that runs the same way on any machine.',
        concepts: ['Image — immutable build artifact', 'Container — running instance of an image', 'Dockerfile — build instructions', 'Layers — cached, reusable build steps', 'Registry — image storage (Docker Hub, ECR…)'],
        install: [
          { platform: 'macOS (Homebrew)', command: 'brew install --cask docker' },
          { platform: 'Linux', command: 'curl -fsSL https://get.docker.com | sh' },
          { platform: 'Windows', command: 'winget install Docker.DockerDesktop' },
        ],
        commands: ['docker build -t app .', 'docker run -p 8080:80 app', 'docker ps', 'docker exec -it <id> sh', 'docker compose up -d'],
        services: [
          {
            label: 'Core Objects',
            items: [
              { name: 'Image', desc: 'Immutable, layered filesystem snapshot of an app.', example: 'docker images\n\ndocker build -t myapp:1.0 .' },
              { name: 'Container', desc: 'A running (or stopped) instance of an image.', example: 'docker run -d --name web nginx\n\ndocker stop web && docker rm web' },
              { name: 'Dockerfile', desc: 'Instructions describing how to build an image.', example: 'FROM node:20\nCOPY . .\nRUN npm install\nCMD ["npm", "start"]\n\nFROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt' },
              { name: 'Layer', desc: 'Cached filesystem diff — speeds up rebuilds.', example: 'docker history myimage\n\ndocker inspect myimage --format=\'{{.RootFS.Layers}}\'' },
              { name: 'Volume', desc: 'Persistent storage that outlives a container.', example: 'docker volume create mydata\n\ndocker run -v mydata:/var/lib/mysql mysql' },
              { name: 'Network', desc: 'Virtual network connecting containers to each other.', example: 'docker network create mynet\n\ndocker run --network mynet --name db postgres' },
              { name: 'Registry', desc: 'Stores and distributes images (Docker Hub, ECR, GHCR).', example: 'docker push myrepo/myimage:latest\n\ndocker pull ghcr.io/org/image:latest' },
              { name: 'Compose', desc: 'Defines and runs multi-container apps from one YAML file.', example: 'services:\n  web:\n    image: nginx\n    ports: ["80:80"]\n\ndocker compose up -d && docker compose logs -f' },
              { name: 'Buildx', desc: 'Extended builder supporting multi-platform images.', example: 'docker buildx build --platform linux/amd64,linux/arm64 -t app .\n\ndocker buildx create --use --name mybuilder' },
              { name: 'Swarm', desc: 'Docker\'s native (lightweight) clustering/orchestration.', example: 'docker swarm init\n\ndocker service create --replicas 3 --name web nginx' },
              { name: 'Docker Desktop', desc: 'Local dev environment bundling engine + GUI.', example: 'Open Docker Desktop → Settings (GUI app, no CLI equivalent)\n\nSettings → Resources → adjust CPU/memory allocated to the Docker VM' },
              { name: 'Healthcheck', desc: 'Defines how Docker verifies a container is functioning.', example: 'HEALTHCHECK CMD curl -f http://localhost/ || exit 1\n\ndocker inspect --format=\'{{.State.Health.Status}}\' mycontainer' },
              { name: 'Bind Mount', desc: 'Maps a host filesystem path directly into a container.', example: 'docker run -v $(pwd):/app node:20\n\ndocker run -v /host/logs:/var/log/app:ro myapp' },
              { name: 'Multi-stage Build', desc: 'Uses multiple FROM stages to keep final images small.', example: 'FROM golang AS build\nRUN go build -o app\nFROM alpine\nCOPY --from=build /app /app\n\nFROM node:20 AS build\nRUN npm ci && npm run build\nFROM nginx\nCOPY --from=build /dist /usr/share/nginx/html' },
              { name: '.dockerignore', desc: 'Excludes files from the build context, like .gitignore.', example: 'node_modules\n.git\n\n*.log\n.env' },
              { name: 'Docker Hub', desc: 'Default public registry for pulling and pushing images.', example: 'docker pull nginx:latest\n\ndocker login && docker push myuser/myimage:latest' },
              { name: 'Docker Context', desc: 'Switches the CLI between local and remote Docker engines.', example: 'docker context use remote-server\n\ndocker context create remote-server --docker "host=ssh://user@server"' },
              { name: 'Docker Scout', desc: 'Scans images for known vulnerabilities.', example: 'docker scout cves myimage:latest\n\ndocker scout compare myimage:latest --to myimage:previous' },
              { name: 'Entrypoint / CMD', desc: 'Defines the default process a container runs on start.', example: 'ENTRYPOINT ["./start.sh"]\n\nCMD ["--port", "8080"]  # default args, overridden by `docker run myimage --port 9090`' },
              { name: 'Restart Policy', desc: 'Controls whether Docker auto-restarts a stopped container.', example: 'docker run --restart unless-stopped nginx\n\ndocker update --restart=on-failure:5 mycontainer' },
            ],
          },
        ],
      },
      {
        slug: 'kubernetes',
        name: 'Kubernetes',
        logo: 'kubernetes',
        desc: 'Orchestrates containers across a cluster of machines — scheduling, scaling, self-healing, service discovery, and rolling updates.',
        concepts: ['Pod — smallest deployable unit', 'Deployment — manages replica Pods', 'Service — stable network endpoint', 'ConfigMap / Secret — config & credentials', 'Ingress — external HTTP routing'],
        install: [
          { platform: 'macOS (Homebrew)', command: 'brew install kubectl' },
          { platform: 'Linux', command: 'curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && sudo install kubectl /usr/local/bin' },
          { platform: 'Windows', command: 'winget install -e --id Kubernetes.kubectl' },
        ],
        commands: ['kubectl get pods -A', 'kubectl apply -f deployment.yaml', 'kubectl logs <pod> -f', 'kubectl rollout restart deployment/<name>'],
        services: [
          {
            label: 'Workloads',
            items: [
              { name: 'Pod', desc: 'Smallest deployable unit — one or more containers.', example: 'apiVersion: v1\nkind: Pod\nmetadata: { name: nginx }\nspec:\n  containers:\n    - name: nginx\n      image: nginx:latest' },
              { name: 'Deployment', desc: 'Manages replica Pods and rolling updates.', example: 'apiVersion: apps/v1\nkind: Deployment\nmetadata: { name: web }\nspec:\n  replicas: 3\n  selector: { matchLabels: { app: web } }\n  template:\n    metadata: { labels: { app: web } }\n    spec:\n      containers:\n        - name: web\n          image: nginx' },
              { name: 'ReplicaSet', desc: 'Ensures a fixed number of identical Pods are running.', example: 'apiVersion: apps/v1\nkind: ReplicaSet\nmetadata: { name: web-rs }\nspec:\n  replicas: 3\n  selector: { matchLabels: { app: web } }' },
              { name: 'StatefulSet', desc: 'Manages Pods that need stable identity/storage.', example: 'apiVersion: apps/v1\nkind: StatefulSet\nmetadata: { name: db }\nspec:\n  serviceName: db\n  replicas: 3' },
              { name: 'DaemonSet', desc: 'Runs one Pod copy on every (or select) node.', example: 'apiVersion: apps/v1\nkind: DaemonSet\nmetadata: { name: log-agent }\nspec:\n  selector: { matchLabels: { app: log-agent } }' },
              { name: 'Job / CronJob', desc: 'Runs Pods to completion, once or on a schedule.', example: 'apiVersion: batch/v1\nkind: CronJob\nmetadata: { name: backup }\nspec:\n  schedule: "0 2 * * *"\n  jobTemplate:\n    spec:\n      template:\n        spec:\n          containers: [{ name: backup, image: backup-tool }]\n          restartPolicy: OnFailure' },
            ],
          },
          {
            label: 'Networking',
            items: [
              { name: 'Service', desc: 'Stable virtual IP/DNS name in front of a set of Pods.', example: 'apiVersion: v1\nkind: Service\nmetadata: { name: web }\nspec:\n  selector: { app: web }\n  ports: [{ port: 80, targetPort: 8080 }]' },
              { name: 'Ingress', desc: 'Routes external HTTP(S) traffic into the cluster.', example: 'apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata: { name: web }\nspec:\n  rules:\n    - host: example.com\n      http:\n        paths:\n          - path: /\n            pathType: Prefix\n            backend: { service: { name: web, port: { number: 80 } } }' },
              { name: 'NetworkPolicy', desc: 'Firewall rules controlling Pod-to-Pod traffic.', example: 'apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata: { name: deny-all }\nspec:\n  podSelector: {}\n  policyTypes: [Ingress]' },
            ],
          },
          {
            label: 'Configuration & Storage',
            items: [
              { name: 'ConfigMap', desc: 'Injects non-secret configuration into Pods.', example: 'apiVersion: v1\nkind: ConfigMap\nmetadata: { name: app-config }\ndata:\n  LOG_LEVEL: "info"' },
              { name: 'Secret', desc: 'Injects sensitive data (tokens, passwords) into Pods.', example: 'apiVersion: v1\nkind: Secret\nmetadata: { name: db-secret }\ntype: Opaque\ndata:\n  password: cGFzc3dvcmQ=' },
              { name: 'PersistentVolume(Claim)', desc: 'Requests and binds durable storage for Pods.', example: 'apiVersion: v1\nkind: PersistentVolumeClaim\nmetadata: { name: data }\nspec:\n  accessModes: [ReadWriteOnce]\n  resources: { requests: { storage: 10Gi } }' },
            ],
          },
          {
            label: 'Scheduling & Scaling',
            items: [
              { name: 'HPA', desc: 'Horizontal Pod Autoscaler — scales replicas by load.', example: 'apiVersion: autoscaling/v2\nkind: HorizontalPodAutoscaler\nmetadata: { name: web }\nspec:\n  scaleTargetRef: { kind: Deployment, name: web }\n  minReplicas: 2\n  maxReplicas: 10' },
              { name: 'Taint & Toleration', desc: 'Repels Pods from nodes unless they explicitly tolerate it.', example: 'kubectl taint nodes node1 key=value:NoSchedule\n\ntolerations:\n  - key: "key"\n    operator: "Equal"\n    value: "value"\n    effect: "NoSchedule"' },
              { name: 'Affinity / Anti-affinity', desc: 'Rules to co-locate or spread Pods across nodes.', example: 'affinity:\n  podAntiAffinity:\n    requiredDuringSchedulingIgnoredDuringExecution:\n      - labelSelector: { matchLabels: { app: web } }\n        topologyKey: "kubernetes.io/hostname"' },
              { name: 'PodDisruptionBudget', desc: 'Limits how many Pods can be down during voluntary disruptions.', example: 'apiVersion: policy/v1\nkind: PodDisruptionBudget\nmetadata: { name: web-pdb }\nspec:\n  minAvailable: 2\n  selector: { matchLabels: { app: web } }' },
            ],
          },
          {
            label: 'Cluster Organization & Security',
            items: [
              { name: 'Namespace', desc: 'Virtual cluster partition for isolating resources.', example: 'apiVersion: v1\nkind: Namespace\nmetadata: { name: staging }' },
              { name: 'ServiceAccount / RBAC', desc: 'Identity and permissions for workloads and users.', example: 'apiVersion: v1\nkind: ServiceAccount\nmetadata: { name: deployer }\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata: { name: deployer-binding }\nsubjects: [{ kind: ServiceAccount, name: deployer }]\nroleRef: { kind: Role, name: edit, apiGroup: rbac.authorization.k8s.io }' },
              { name: 'Resource Requests/Limits', desc: 'Reserves and caps CPU/memory a container can use.', example: 'resources:\n  requests: { cpu: "250m", memory: "256Mi" }\n  limits:   { cpu: "500m", memory: "512Mi" }' },
            ],
          },
          {
            label: 'Control Plane Internals',
            items: [
              { name: 'Node', desc: 'A worker machine (VM or bare metal) running Pods.', example: 'kubectl get nodes -o wide' },
              { name: 'kube-scheduler', desc: 'Assigns Pods to nodes based on resources and constraints.', example: 'kubectl get pods -n kube-system -l component=kube-scheduler' },
              { name: 'kube-apiserver', desc: 'Front door to the cluster — validates and processes API requests.', example: 'kubectl get --raw /healthz' },
              { name: 'etcd', desc: 'Consistent key-value store holding all cluster state.', example: 'etcdctl endpoint health' },
              { name: 'kubelet', desc: 'Node agent that ensures containers described in PodSpecs are running.', example: 'systemctl status kubelet' },
              { name: 'Controller Manager', desc: 'Runs core control loops (nodes, replication, endpoints…).', example: 'kubectl get pods -n kube-system -l component=kube-controller-manager' },
            ],
          },
          {
            label: 'Extensibility',
            items: [
              { name: 'CRD', desc: 'Custom Resource Definition — extends the Kubernetes API.', example: 'apiVersion: apiextensions.k8s.io/v1\nkind: CustomResourceDefinition\nmetadata: { name: widgets.example.com }' },
              { name: 'Helm Chart / Operator', desc: 'Packaging and automation layers built on the Kubernetes API.', example: 'helm install my-operator ./operator-chart' },
            ],
          },
        ],
      },
      {
        slug: 'helm',
        name: 'Helm',
        logo: 'helm',
        desc: 'Package manager for Kubernetes — bundles manifests into versioned, templated "charts" so deployments are repeatable across environments.',
        concepts: ['Chart — packaged app template', 'Release — a deployed chart instance', 'values.yaml — environment-specific overrides', 'Repository — chart storage', 'Rollback — revert to a prior release'],
        install: [
          { platform: 'macOS (Homebrew)', command: 'brew install helm' },
          { platform: 'Linux', command: 'curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash' },
          { platform: 'Windows', command: 'winget install Helm.Helm' },
        ],
        commands: ['helm install myapp ./chart', 'helm upgrade myapp ./chart -f values.yaml', 'helm rollback myapp 1', 'helm list'],
        services: [
          {
            label: 'Core Concepts',
            items: [
              { name: 'Chart', desc: 'Packaged bundle of Kubernetes manifest templates.', example: 'helm create mychart\n\nhelm package ./mychart' },
              { name: 'Release', desc: 'A specific deployed instance of a chart.', example: 'helm list\n\nhelm install myapp ./mychart --namespace prod --create-namespace' },
              { name: 'values.yaml', desc: 'Default configuration values a chart is templated with.', example: 'replicaCount: 3\nimage:\n  repository: nginx\n  tag: latest\n\nhelm install myapp ./mychart -f values-prod.yaml' },
              { name: 'Template', desc: 'Go-templated Kubernetes YAML inside a chart.', example: '{{- range .Values.items }}\nname: {{ . }}\n{{- end }}\n\nhelm template myapp ./mychart  # renders manifests locally without installing' },
              { name: 'Repository', desc: 'Index of charts that can be installed by name.', example: 'helm repo add bitnami https://charts.bitnami.com/bitnami\n\nhelm repo update' },
              { name: 'Hook', desc: 'Runs jobs at points in a release lifecycle (pre/post-install).', example: 'annotations:\n  "helm.sh/hook": pre-install\n\nannotations:\n  "helm.sh/hook-weight": "1"' },
              { name: 'Dependency', desc: 'Sub-charts a chart relies on.', example: 'dependencies:\n  - name: redis\n    version: "17.x"\n    repository: "https://charts.bitnami.com/bitnami"\n\nhelm dependency update ./mychart' },
              { name: 'Rollback', desc: 'Reverts a release to a previous revision.', example: 'helm rollback myapp 2\n\nhelm history myapp  # see revisions to roll back to' },
              { name: 'Helm Hub / Artifact Hub', desc: 'Searchable index of publicly published charts.', example: 'helm search hub wordpress\n\nhelm repo add stable https://charts.helm.sh/stable' },
              { name: 'helmfile', desc: 'Declarative spec for managing many Helm releases at once.', example: 'releases:\n  - name: myapp\n    chart: ./mychart\n\nhelmfile apply' },
              { name: 'Chart.yaml', desc: 'Metadata file describing a chart\'s name, version, and dependencies.', example: 'apiVersion: v2\nname: mychart\nversion: 0.1.0\n\ndependencies:\n  - name: postgresql\n    version: "12.x"' },
              { name: 'Lint', desc: 'Validates a chart\'s templates and structure before install.', example: 'helm lint ./mychart\n\nhelm lint ./mychart --values values-prod.yaml' },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'CI/CD & GitOps',
    tools: [
      {
        slug: 'jenkins',
        name: 'Jenkins',
        logo: 'jenkins',
        desc: 'Self-hosted, plugin-driven automation server. Pipelines are defined as code in a Jenkinsfile and run across master/agent nodes.',
        concepts: ['Pipeline — declarative or scripted', 'Stages & steps', 'Agents/nodes — where builds run', 'Shared libraries — reusable pipeline code', 'Plugins — huge ecosystem'],
        install: [
          { platform: 'Docker', command: 'docker run -p 8080:8080 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts' },
          { platform: 'macOS (Homebrew)', command: 'brew install jenkins-lts' },
          { platform: 'Linux (apt)', command: 'sudo apt update && sudo apt install jenkins' },
        ],
        commands: [
          "pipeline {",
          "  agent any",
          "  stages {",
          "    stage('Build') { steps { sh 'make build' } }",
          "    stage('Deploy') { steps { sh 'make deploy' } }",
          "  }",
          "}",
        ],
        services: [
          {
            label: 'Core Concepts',
            items: [
              { name: 'Pipeline', desc: 'Code-defined sequence of build/test/deploy stages.', example: "pipeline { agent any; stages { stage('Build') { steps { sh 'make build' } } } }\n\npipeline {\n  agent any\n  stages {\n    stage('Test') { steps { sh 'make test' } }\n  }\n}" },
              { name: 'Stage / Step', desc: 'A labeled phase of a pipeline / a single action within it.', example: "stage('Test') { steps { sh 'make test' } }\n\nstage('Deploy') { steps { sh 'make deploy' } }" },
              { name: 'Agent / Node', desc: 'A machine (or container) that executes pipeline work.', example: "agent { label 'linux' }\n\nagent { docker { image 'node:20' } }" },
              { name: 'Executor', desc: 'A slot on an agent that can run one job at a time.', example: 'Manage Jenkins → Nodes → set "# of executors"\n\nManage Jenkins → Nodes → New Node → set executor count for that agent' },
              { name: 'Jenkinsfile', desc: 'Pipeline definition checked into source control.', example: 'Jenkinsfile at repo root — auto-detected by Multibranch Pipeline\n\ngit log -- Jenkinsfile  # pipeline changes reviewed like any code change' },
              { name: 'Plugin', desc: 'Extends Jenkins — SCM, notifications, cloud integrations.', example: 'Manage Jenkins → Plugins → Install "Slack Notification"\n\njenkins-plugin-cli --plugins blueocean:1.27.0' },
              { name: 'Shared Library', desc: 'Reusable Groovy code shared across pipelines.', example: "@Library('my-shared-lib') _\nmyLibFunction()\n\n// vars/myLibFunction.groovy\ndef call() { echo 'shared step' }" },
              { name: 'Multibranch Pipeline', desc: 'Auto-creates a pipeline per branch/PR in a repo.', example: 'New Item → Multibranch Pipeline → point at repo URL\n\nJenkinsfile checked into every branch — Jenkins auto-builds each one on push' },
              { name: 'Credentials Store', desc: 'Securely stores tokens, keys, and passwords.', example: "withCredentials([usernamePassword(credentialsId: 'db-creds', usernameVariable: 'U', passwordVariable: 'P')]) { sh 'deploy.sh' }\n\nManage Jenkins → Credentials → add \"Secret text\" for an API token" },
              { name: 'Blue Ocean', desc: 'Visual pipeline editor and run visualization UI.', example: 'Open "Blue Ocean" from the Jenkins sidebar to view a pipeline visually\n\nBlue Ocean → New Pipeline → visually pick a Git repo and branch' },
              { name: 'Trigger (webhook/poll/cron)', desc: 'What starts a build — push, PR, schedule, or manual.', example: "triggers { cron('H 2 * * *') }\n\ntriggers { pollSCM('H/5 * * * *') }" },
              { name: 'Artifact Archiving', desc: 'Saves build outputs for later stages or download.', example: "archiveArtifacts artifacts: 'build/*.jar'\n\narchiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true" },
              { name: 'Post Actions', desc: 'Steps that always run after a stage/pipeline (success/failure).', example: "post { failure { mail to: 'team@x.com', subject: 'Build failed' } }\n\npost { always { junit 'reports/**/*.xml' } }" },
              { name: 'Parameters', desc: 'User-supplied inputs when manually triggering a build.', example: "parameters { string(name: 'VERSION', defaultValue: '1.0') }\n\nparameters { choice(name: 'ENV', choices: ['dev', 'staging', 'prod']) }" },
              { name: 'Distributed Builds', desc: 'Master delegates work to multiple agent nodes in parallel.', example: "agent { label 'docker-agent' }\n\nagent { label 'windows && docker' }" },
            ],
          },
        ],
      },
      {
        slug: 'github-actions',
        name: 'GitHub Actions',
        logo: 'githubactions',
        desc: 'CI/CD workflows defined as YAML directly in the repo, triggered by pushes, PRs, schedules, or manual dispatch — no separate server to run.',
        concepts: ['Workflow — YAML file in .github/workflows', 'Job — runs on a fresh runner', 'Step — a command or reusable Action', 'Secrets — encrypted repo/org credentials'],
        install: [
          { platform: 'gh CLI (macOS)', command: 'brew install gh' },
          { platform: 'gh CLI (Linux)', command: 'sudo apt install gh' },
          { platform: 'Self-hosted runner', command: './config.sh --url https://github.com/<org>/<repo> --token <token> && ./run.sh' },
        ],
        commands: [
          'name: CI',
          'on: [push]',
          'jobs:',
          '  build:',
          '    runs-on: ubuntu-latest',
          '    steps:',
          '      - uses: actions/checkout@v4',
          "      - run: make build",
        ],
        services: [
          {
            label: 'Core Concepts',
            items: [
              { name: 'Workflow', desc: 'YAML file in .github/workflows defining automation.', example: '.github/workflows/ci.yml\n\n.github/workflows/deploy.yml' },
              { name: 'Job', desc: 'A set of steps that run together on one runner.', example: 'jobs:\n  build:\n    runs-on: ubuntu-latest\n\njobs:\n  test:\n    needs: build\n    runs-on: ubuntu-latest' },
              { name: 'Step', desc: 'A single command or reusable Action inside a job.', example: '- run: npm test\n\n- name: Build\n  run: npm run build' },
              { name: 'Action', desc: 'Reusable packaged unit of automation logic.', example: '- uses: actions/setup-node@v4\n\n- uses: actions/checkout@v4\n  with: { fetch-depth: 0 }' },
              { name: 'Runner', desc: 'The VM/container that executes a job (hosted or self-hosted).', example: 'runs-on: ubuntu-latest\n\nruns-on: [self-hosted, linux, gpu]' },
              { name: 'Trigger (on:)', desc: 'Event that starts a workflow — push, PR, schedule…', example: 'on:\n  push: { branches: [main] }\n  pull_request: {}\n\non:\n  schedule:\n    - cron: \'0 2 * * *\'' },
              { name: 'Secrets', desc: 'Encrypted values injected into workflows at runtime.', example: '${{ secrets.NPM_TOKEN }}\n\n${{ secrets.AWS_ACCESS_KEY_ID }}' },
              { name: 'Matrix', desc: 'Runs a job across multiple OS/version combinations.', example: 'strategy:\n  matrix:\n    node: [18, 20, 22]\n\nstrategy:\n  matrix:\n    os: [ubuntu-latest, macos-latest, windows-latest]' },
              { name: 'Artifact', desc: 'Files persisted between jobs or after a run.', example: '- uses: actions/upload-artifact@v4\n  with: { name: build, path: dist/ }\n\n- uses: actions/download-artifact@v4\n  with: { name: build }' },
              { name: 'Environment', desc: 'Deployment target with its own secrets/protection rules.', example: 'environment: production\n\nenvironment:\n  name: production\n  url: https://example.com' },
              { name: 'Reusable Workflow', desc: 'A workflow called from other workflows to avoid duplication.', example: 'uses: ./.github/workflows/build.yml\n\njobs:\n  call-build:\n    uses: org/repo/.github/workflows/build.yml@main' },
              { name: 'Composite Action', desc: 'Bundles multiple steps into a single reusable Action.', example: 'runs:\n  using: "composite"\n  steps: [...]\n\ninputs:\n  node-version:\n    default: \'20\'' },
              { name: 'Cache', desc: 'Speeds up runs by reusing dependencies between builds.', example: "- uses: actions/cache@v4\n  with: { path: ~/.npm, key: npm-${{ hashFiles('package-lock.json') }} }\n\n- uses: actions/cache/restore@v4\n  with: { key: deps-${{ github.sha }} }" },
              { name: 'Marketplace', desc: 'Public catalog of prebuilt community/official Actions.', example: '- uses: docker/build-push-action@v5\n\n- uses: aws-actions/configure-aws-credentials@v4' },
              { name: 'Dependabot', desc: 'Automated dependency update PRs, integrates with workflows.', example: 'version: 2\nupdates:\n  - package-ecosystem: "npm"\n    directory: "/"\n    schedule: { interval: "weekly" }\n\nupdates:\n  - package-ecosystem: "github-actions"\n    directory: "/"\n    schedule: { interval: "monthly" }' },
              { name: 'GITHUB_TOKEN', desc: 'Auto-generated token scoped to the repo for a workflow run.', example: '${{ secrets.GITHUB_TOKEN }}\n\npermissions:\n  contents: read\n  pull-requests: write  # scope GITHUB_TOKEN down explicitly' },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Observability',
    tools: [
      {
        slug: 'prometheus',
        name: 'Prometheus',
        logo: 'prometheus',
        desc: 'Pull-based metrics collection and time-series database, with PromQL for querying and Alertmanager for routing alerts.',
        concepts: ['Scrape targets — endpoints exposing /metrics', 'Exporters — expose metrics for 3rd-party systems', 'PromQL — query language', 'Alerting rules', 'Service discovery'],
        install: [
          { platform: 'Docker', command: 'docker run -p 9090:9090 prom/prometheus' },
          { platform: 'macOS (Homebrew)', command: 'brew install prometheus' },
          { platform: 'Linux', command: 'tar xvfz prometheus-*.tar.gz && cd prometheus-* && ./prometheus --config.file=prometheus.yml' },
        ],
        commands: ['promtool check config prometheus.yml', 'rate(http_requests_total[5m])', 'sum by (job) (up)'],
        services: [
          {
            label: 'Core Concepts',
            items: [
              { name: 'Scrape Target', desc: 'An endpoint Prometheus polls for /metrics.', example: "scrape_configs:\n  - job_name: 'app'\n    static_configs: [{ targets: ['localhost:9100'] }]\n\nscrape_configs:\n  - job_name: 'node'\n    static_configs: [{ targets: ['10.0.0.5:9100'] }]" },
              { name: 'Exporter', desc: 'Translates a system\'s stats into Prometheus format.', example: './node_exporter --web.listen-address=:9100\n\n./postgres_exporter --web.listen-address=:9187' },
              { name: 'PromQL', desc: 'Query language for slicing and aggregating metrics.', example: 'rate(http_requests_total[5m])\n\nhistogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))' },
              { name: 'Recording Rule', desc: 'Precomputes expensive queries into new time series.', example: 'groups:\n  - name: example\n    rules:\n      - record: job:http_requests:rate5m\n        expr: rate(http_requests_total[5m])\n\n- record: instance:node_cpu:avg_rate5m\n  expr: avg(rate(node_cpu_seconds_total[5m])) by (instance)' },
              { name: 'Alerting Rule', desc: 'Defines conditions that fire alerts.', example: '- alert: HighErrorRate\n  expr: rate(http_errors_total[5m]) > 0.05\n  for: 10m\n\n- alert: InstanceDown\n  expr: up == 0\n  for: 5m' },
              { name: 'Alertmanager', desc: 'Dedupes, groups, and routes alerts to Slack/email/PagerDuty.', example: "route:\n  receiver: 'slack'\nreceivers:\n  - name: 'slack'\n    slack_configs: [{ channel: '#alerts' }]\n\nroute:\n  group_by: ['alertname']\n  repeat_interval: 4h" },
              { name: 'Service Discovery', desc: 'Auto-finds scrape targets (Kubernetes, EC2, Consul…).', example: 'kubernetes_sd_configs:\n  - role: pod\n\nec2_sd_configs:\n  - region: us-east-1' },
              { name: 'Remote Write', desc: 'Ships samples to long-term/external storage.', example: 'remote_write:\n  - url: "https://remote-storage/api/v1/write"\n\nremote_write:\n  - url: "https://cortex.example.com/api/v1/push"\n    basic_auth: { username: prom, password: secret }' },
              { name: 'TSDB', desc: 'Prometheus\' built-in time-series storage engine.', example: 'promtool tsdb list-block /data\n\npromtool tsdb create-blocks-from openmetrics data.txt ./data' },
              { name: 'Node Exporter', desc: 'Exposes host-level metrics — CPU, memory, disk, network.', example: 'curl localhost:9100/metrics\n\ndocker run -d -p 9100:9100 prom/node-exporter' },
              { name: 'Federation', desc: 'One Prometheus server scrapes summarized data from another.', example: "/federate?match[]={job=\"prometheus\"}\n\nscrape_configs:\n  - job_name: 'federate'\n    honor_labels: true\n    metrics_path: /federate" },
              { name: 'Pushgateway', desc: 'Accepts metrics from short-lived batch jobs that can\'t be scraped.', example: 'echo "my_metric 42" | curl --data-binary @- http://pushgateway:9091/metrics/job/my_job\n\ndocker run -d -p 9091:9091 prom/pushgateway' },
              { name: 'Labels', desc: 'Key-value pairs that identify and filter time series.', example: 'http_requests_total{method="GET", status="200"}\n\nsum by (status) (rate(http_requests_total[5m]))' },
              { name: 'Blackbox Exporter', desc: 'Probes endpoints over HTTP/TCP/ICMP for uptime checks.', example: "- job_name: 'blackbox'\n  metrics_path: /probe\n  params: { module: [http_2xx] }\n\ncurl \"localhost:9115/probe?target=example.com&module=http_2xx\"" },
            ],
          },
        ],
      },
      {
        slug: 'grafana',
        name: 'Grafana',
        logo: 'grafana',
        desc: 'Visualization layer for metrics, logs, and traces — dashboards that query Prometheus, Loki, Elasticsearch, and other data sources.',
        concepts: ['Dashboard — collection of panels', 'Panel — a single chart/table/stat', 'Data source — Prometheus, Loki, CloudWatch…', 'Alerting — threshold-based notifications', 'Variables — dynamic dashboard filters'],
        install: [
          { platform: 'Docker', command: 'docker run -d -p 3000:3000 grafana/grafana' },
          { platform: 'macOS (Homebrew)', command: 'brew install grafana' },
          { platform: 'Linux (apt)', command: 'sudo apt-get install grafana' },
        ],
        commands: ['grafana-cli plugins install <plugin>', 'GET /api/dashboards/uid/:uid', 'POST /api/datasources'],
        services: [
          {
            label: 'Core Concepts',
            items: [
              { name: 'Dashboard', desc: 'A collection of panels visualizing related data.', example: 'POST /api/dashboards/db  { "dashboard": { "title": "Ops" } }\n\nGET /api/dashboards/uid/abc123  # fetch dashboard JSON' },
              { name: 'Panel', desc: 'A single chart, table, or stat visualization.', example: '{ "type": "timeseries", "title": "CPU", "targets": [{ "expr": "rate(cpu[5m])" }] }\n\n{ "type": "stat", "title": "Uptime", "targets": [{ "expr": "up" }] }' },
              { name: 'Data Source', desc: 'Connection to a backend — Prometheus, Loki, SQL, etc.', example: 'POST /api/datasources  { "name": "Prometheus", "type": "prometheus", "url": "http://prom:9090" }\n\nPOST /api/datasources  { "name": "Loki", "type": "loki", "url": "http://loki:3100" }' },
              { name: 'Alert Rule', desc: 'Threshold-based condition that triggers a notification.', example: '{ "condition": "B", "data": [{ "refId": "A", "expr": "up == 0" }] }\n\nPOST /api/v1/provisioning/alert-rules  { "title": "High CPU", "condition": "B" }' },
              { name: 'Variable', desc: 'Dropdown filter that dynamically changes dashboard queries.', example: 'label_values(node_exporter_build_info, instance)\n\nlabel_values(kube_pod_info, namespace)' },
              { name: 'Annotation', desc: 'Marks events (deploys, incidents) directly on graphs.', example: 'POST /api/annotations  { "text": "Deploy v1.2", "time": 1717000000000 }\n\nGET /api/annotations?dashboardId=1&limit=10' },
              { name: 'Plugin', desc: 'Adds new panels, data sources, or apps to Grafana.', example: 'grafana-cli plugins install grafana-piechart-panel\n\ngrafana-cli plugins list-remote' },
              { name: 'Playlist', desc: 'Cycles through a set of dashboards automatically.', example: 'POST /api/playlists  { "name": "Ops", "interval": "1m" }\n\nGET /api/playlists' },
              { name: 'Folder', desc: 'Organizes dashboards and controls access permissions.', example: 'POST /api/folders  { "title": "Production" }\n\nGET /api/folders' },
              { name: 'Explore', desc: 'Ad-hoc query and log exploration outside of dashboards.', example: 'Explore tab → pick data source → run ad-hoc query\n\nExplore → Prometheus → query: rate(http_requests_total[5m])' },
              { name: 'Loki', desc: 'Grafana Labs\' log aggregation system, queried like Prometheus.', example: '{app="web"} |= "error"\n\n{app="web", env="prod"} |= "timeout" | json' },
              { name: 'Tempo', desc: 'Grafana Labs\' distributed tracing backend.', example: 'Search by traceID=abc123 in the Tempo data source\n\n{ service.name="checkout" && duration > 500ms }' },
              { name: 'Notification Channel', desc: 'Where alerts are sent — Slack, email, PagerDuty, webhook.', example: 'POST /api/alert-notifications  { "type": "slack", "settings": { "url": "..." } }\n\nPOST /api/v1/provisioning/contact-points  { "type": "email", "settings": { "addresses": "team@x.com" } }' },
              { name: 'Team & RBAC', desc: 'Controls who can view/edit dashboards and data sources.', example: 'POST /api/teams  { "name": "sre-team" }\n\nPOST /api/access-control/teams/1/roles  { "roleUid": "editor" }' },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Security',
    tools: [
      {
        slug: 'vault',
        name: 'Vault',
        logo: 'vault',
        desc: 'Centralizes secrets management, encryption as a service, and identity-based access — issuing short-lived, dynamic credentials instead of static ones.',
        concepts: ['Secrets engines — KV, database, PKI…', 'Auth methods — how clients authenticate', 'Policies — fine-grained access control', 'Dynamic secrets — generated on demand', 'Leases — automatic credential expiry'],
        install: [
          { platform: 'macOS (Homebrew)', command: 'brew tap hashicorp/tap && brew install hashicorp/tap/vault' },
          { platform: 'Linux (apt)', command: 'wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg && sudo apt install vault' },
          { platform: 'Docker', command: 'docker run --cap-add=IPC_LOCK -d --name=vault vault' },
        ],
        commands: ['vault login', 'vault kv put secret/myapp key=value', 'vault kv get secret/myapp', 'vault policy write my-policy policy.hcl'],
        services: [
          {
            label: 'Core Concepts',
            items: [
              { name: 'KV Secrets Engine', desc: 'Simple key-value storage for static secrets.', example: 'vault kv put secret/myapp key=value\n\nvault kv get -field=key secret/myapp' },
              { name: 'Database Secrets Engine', desc: 'Generates short-lived database credentials on demand.', example: 'vault write database/roles/my-role db_name=mydb creation_statements="CREATE ROLE..."\n\nvault read database/creds/my-role' },
              { name: 'PKI Secrets Engine', desc: 'Issues and manages dynamic TLS certificates.', example: 'vault write pki/issue/my-role common_name=example.com\n\nvault write pki/roles/my-role allowed_domains="example.com" allow_subdomains=true' },
              { name: 'Transit Engine', desc: 'Encryption-as-a-service without storing the data itself.', example: 'vault write transit/encrypt/my-key plaintext=$(base64 <<< "secret")\n\nvault write transit/decrypt/my-key ciphertext=<ciphertext>' },
              { name: 'Auth Method', desc: 'How a client proves identity — token, AppRole, Kubernetes…', example: 'vault auth enable approle\n\nvault login -method=kubernetes role=my-role' },
              { name: 'Policy', desc: 'HCL rules defining what an identity can access.', example: 'path "secret/data/myapp" {\n  capabilities = ["read"]\n}\n\nvault policy read my-policy' },
              { name: 'Lease', desc: 'Time-bound validity attached to a dynamic secret.', example: 'vault lease renew <lease_id>\n\nvault lease revoke <lease_id>' },
              { name: 'Seal / Unseal', desc: 'Encrypts Vault\'s storage; unsealing is required to operate.', example: 'vault operator unseal <key>\n\nvault operator seal  # re-seal Vault in an emergency' },
              { name: 'Namespace', desc: 'Isolated, multi-tenant Vault environment (Enterprise).', example: 'vault namespace create my-team\n\nvault namespace list' },
              { name: 'AppRole', desc: 'Machine-to-machine auth method using role/secret IDs.', example: 'vault write auth/approle/role/my-role token_policies="my-policy"\n\nvault write auth/approle/role/my-role/secret-id' },
              { name: 'Kubernetes Auth', desc: 'Lets Pods authenticate to Vault using their service account token.', example: 'vault write auth/kubernetes/role/my-role bound_service_account_names=my-sa\n\nvault read auth/kubernetes/role/my-role' },
              { name: 'Audit Device', desc: 'Logs every request/response to Vault for compliance.', example: 'vault audit enable file file_path=/var/log/vault_audit.log\n\nvault audit list' },
              { name: 'Unwrap / Response Wrapping', desc: 'One-time-use tokens for securely delivering secrets.', example: 'vault unwrap <wrapping_token>\n\nvault write -wrap-ttl=60s auth/approle/login role_id=<id> secret_id=<secret>' },
              { name: 'Vault Agent', desc: 'Auto-authenticates and caches/renews secrets for an app.', example: 'vault {\n  address = "https://vault:8200"\n}\n\nvault agent -config=agent-config.hcl' },
            ],
          },
        ],
      },
    ],
  },
];
