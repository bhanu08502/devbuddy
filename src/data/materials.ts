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
              { name: 'EC2', desc: 'Resizable virtual machines billed by the second.', example: 'aws ec2 run-instances --image-id ami-0abcdef --instance-type t3.micro' },
              { name: 'Lambda', desc: 'Run code in response to events without managing servers.', example: 'aws lambda invoke --function-name my-fn out.json' },
              { name: 'ECS', desc: 'AWS-native container orchestration (no Kubernetes).', example: 'aws ecs create-service --cluster my-cluster --service-name web --task-definition web:1' },
              { name: 'EKS', desc: 'Managed control plane for running Kubernetes.', example: 'aws eks create-cluster --name my-cluster --role-arn <arn> --resources-vpc-config subnetIds=<ids>' },
              { name: 'Fargate', desc: 'Serverless compute for ECS/EKS — no EC2 instances to manage.', example: 'aws ecs run-task --cluster my-cluster --launch-type FARGATE --task-definition web:1' },
              { name: 'Elastic Beanstalk', desc: 'Upload code, AWS handles provisioning and deploys.', example: 'eb deploy' },
              { name: 'Lightsail', desc: 'Simplified VPS-style hosting with flat monthly pricing.', example: 'aws lightsail create-instances --instance-names my-vm --availability-zone us-east-1a --blueprint-id ubuntu_22_04 --bundle-id nano_2_0' },
              { name: 'Batch', desc: 'Runs large-scale batch computing jobs across managed compute.', example: 'aws batch submit-job --job-name my-job --job-queue my-queue --job-definition my-def' },
              { name: 'App Runner', desc: 'Deploys containerized web apps/APIs straight from source or image.', example: 'aws apprunner create-service --service-name my-app --source-configuration file://source.json' },
              { name: 'Outposts', desc: 'Runs AWS infrastructure on-premises for hybrid workloads.', example: 'aws outposts list-outposts' },
              { name: 'Auto Scaling', desc: 'Automatically adds/removes EC2 instances based on demand.', example: 'aws autoscaling update-auto-scaling-group --auto-scaling-group-name my-asg --min-size 2 --max-size 10' },
            ],
          },
          {
            label: 'Storage',
            items: [
              { name: 'S3', desc: 'Object storage for any amount of data, accessed over HTTP.', example: 'aws s3 cp file.txt s3://my-bucket/' },
              { name: 'EBS', desc: 'Block storage volumes attached to EC2 instances.', example: 'aws ec2 create-volume --availability-zone us-east-1a --size 100 --volume-type gp3' },
              { name: 'EFS', desc: 'Managed elastic file storage shared across instances.', example: 'aws efs create-file-system --performance-mode generalPurpose' },
              { name: 'FSx', desc: 'Managed file systems (Windows, Lustre, NetApp ONTAP).', example: 'aws fsx create-file-system --file-system-type LUSTRE --storage-capacity 1200' },
              { name: 'Glacier', desc: 'Low-cost archival storage for infrequent access.', example: 'aws glacier create-vault --vault-name my-vault --account-id -' },
              { name: 'Storage Gateway', desc: 'Bridges on-prem storage with cloud storage.', example: 'aws storagegateway create-cached-iscsi-volume --gateway-arn <arn> --volume-size-in-bytes 107374182400' },
              { name: 'AWS Backup', desc: 'Centralized backup policy across AWS services.', example: 'aws backup start-backup-job --backup-vault-name my-vault --resource-arn <arn> --iam-role-arn <arn>' },
            ],
          },
          {
            label: 'Database',
            items: [
              { name: 'RDS', desc: 'Managed relational databases (MySQL, Postgres, etc.).', example: 'aws rds create-db-instance --db-instance-identifier mydb --engine postgres --db-instance-class db.t3.micro' },
              { name: 'DynamoDB', desc: 'Managed NoSQL key-value and document database.', example: 'aws dynamodb put-item --table-name Users --item \'{"id":{"S":"1"}}\'' },
              { name: 'Aurora', desc: 'AWS-built MySQL/Postgres-compatible database engine.', example: 'aws rds create-db-cluster --db-cluster-identifier my-cluster --engine aurora-postgresql' },
              { name: 'ElastiCache', desc: 'Managed in-memory cache (Redis / Memcached).', example: 'aws elasticache create-cache-cluster --cache-cluster-id my-cache --engine redis --cache-node-type cache.t3.micro' },
              { name: 'Redshift', desc: 'Managed data warehouse for large-scale analytics.', example: 'aws redshift create-cluster --cluster-identifier my-cluster --node-type dc2.large --master-username admin' },
              { name: 'Neptune', desc: 'Managed graph database for connected data.', example: 'aws neptune create-db-cluster --db-cluster-identifier my-graph-db --engine neptune' },
              { name: 'DocumentDB', desc: 'MongoDB-compatible managed document database.', example: 'aws docdb create-db-cluster --db-cluster-identifier my-docdb --engine docdb' },
              { name: 'Timestream', desc: 'Managed time-series database for IoT and metrics.', example: 'aws timestream-write create-database --database-name my-ts-db' },
              { name: 'QLDB', desc: 'Immutable, cryptographically verifiable ledger database.', example: 'aws qldb create-ledger --name my-ledger --permissions-mode STANDARD' },
              { name: 'Keyspaces', desc: 'Managed Apache Cassandra-compatible database.', example: 'aws keyspaces create-keyspace --keyspace-name my_keyspace' },
            ],
          },
          {
            label: 'Networking & Content Delivery',
            items: [
              { name: 'VPC', desc: 'Isolated virtual network for your resources.', example: 'aws ec2 create-vpc --cidr-block 10.0.0.0/16' },
              { name: 'Route 53', desc: 'DNS and domain registration service.', example: 'aws route53 create-hosted-zone --name example.com --caller-reference 2026-01-01' },
              { name: 'CloudFront', desc: 'Global CDN for caching content close to users.', example: 'aws cloudfront create-distribution --origin-domain-name mybucket.s3.amazonaws.com' },
              { name: 'ELB (ALB/NLB)', desc: 'Load balancers to distribute traffic across instances.', example: 'aws elbv2 create-load-balancer --name my-alb --subnets subnet-abc subnet-def' },
              { name: 'API Gateway', desc: 'Create, publish, and secure REST/WebSocket APIs.', example: 'aws apigatewayv2 create-api --name my-api --protocol-type HTTP' },
              { name: 'Direct Connect', desc: 'Dedicated private network link into AWS.', example: 'aws directconnect create-connection --location EqDC2 --bandwidth 1Gbps --connection-name my-dx' },
              { name: 'Transit Gateway', desc: 'Hub connecting many VPCs and on-prem networks.', example: 'aws ec2 create-transit-gateway --description "hub"' },
              { name: 'PrivateLink', desc: 'Private connectivity to services without traversing the internet.', example: 'aws ec2 create-vpc-endpoint --vpc-id vpc-abc --service-name com.amazonaws.us-east-1.s3' },
              { name: 'Global Accelerator', desc: 'Routes traffic over AWS\'s global network for lower latency.', example: 'aws globalaccelerator create-accelerator --name my-ga' },
            ],
          },
          {
            label: 'Security, Identity & Compliance',
            items: [
              { name: 'IAM', desc: 'Manages users, roles, and fine-grained permissions.', example: 'aws iam create-role --role-name my-role --assume-role-policy-document file://trust.json' },
              { name: 'KMS', desc: 'Managed encryption keys for data at rest and in transit.', example: 'aws kms create-key --description "app encryption key"' },
              { name: 'Secrets Manager', desc: 'Stores and rotates credentials and API keys.', example: 'aws secretsmanager create-secret --name db/password --secret-string \'{"password":"..."}\'' },
              { name: 'Cognito', desc: 'Managed user sign-up, sign-in, and access control.', example: 'aws cognito-idp create-user-pool --pool-name my-users' },
              { name: 'WAF & Shield', desc: 'Web application firewall and DDoS protection.', example: 'aws wafv2 create-web-acl --name my-acl --scope REGIONAL --default-action Allow={}' },
              { name: 'GuardDuty', desc: 'Managed threat detection using ML and threat intel.', example: 'aws guardduty create-detector --enable' },
              { name: 'Security Hub', desc: 'Aggregates security findings and compliance checks.', example: 'aws securityhub enable-security-hub' },
              { name: 'Macie', desc: 'Discovers and protects sensitive data in S3.', example: 'aws macie2 enable-macie' },
              { name: 'Certificate Manager (ACM)', desc: 'Provisions and renews free TLS certificates.', example: 'aws acm request-certificate --domain-name example.com --validation-method DNS' },
              { name: 'IAM Identity Center', desc: 'Centralized SSO across AWS accounts and apps.', example: 'aws sso-admin list-instances' },
            ],
          },
          {
            label: 'Management & Governance',
            items: [
              { name: 'CloudWatch', desc: 'Metrics, logs, and alarms for AWS resources.', example: 'aws cloudwatch put-metric-alarm --alarm-name high-cpu --metric-name CPUUtilization --threshold 80' },
              { name: 'CloudTrail', desc: 'Audit log of every API call made in the account.', example: 'aws cloudtrail create-trail --name my-trail --s3-bucket-name my-logs' },
              { name: 'Config', desc: 'Tracks resource configuration changes and compliance.', example: 'aws configservice put-configuration-recorder --configuration-recorder name=default' },
              { name: 'Organizations', desc: 'Centrally manages billing and policy across multiple accounts.', example: 'aws organizations create-account --email admin@example.com --account-name dev' },
              { name: 'Control Tower', desc: 'Sets up and governs a secure multi-account landing zone.', example: 'aws controltower list-landing-zones' },
              { name: 'Trusted Advisor', desc: 'Automated checks for cost, security, and performance.', example: 'aws support describe-trusted-advisor-checks --language en' },
              { name: 'Systems Manager', desc: 'Operational hub — patching, run command, parameter store.', example: 'aws ssm send-command --instance-ids i-abc --document-name AWS-RunShellScript' },
              { name: 'CloudFormation', desc: 'Native IaC — define AWS resources as JSON/YAML templates.', example: 'aws cloudformation deploy --template-file template.yaml --stack-name my-stack' },
              { name: 'Service Catalog', desc: 'Curates approved IT products for self-service provisioning.', example: 'aws servicecatalog list-portfolios' },
            ],
          },
          {
            label: 'Application Integration',
            items: [
              { name: 'SQS', desc: 'Managed message queues for decoupling services.', example: 'aws sqs send-message --queue-url <url> --message-body "hello"' },
              { name: 'SNS', desc: 'Pub/sub messaging and notifications (email, SMS, push).', example: 'aws sns publish --topic-arn <arn> --message "hello"' },
              { name: 'Step Functions', desc: 'Orchestrates multi-step workflows across services.', example: 'aws stepfunctions start-execution --state-machine-arn <arn>' },
              { name: 'EventBridge', desc: 'Serverless event bus connecting AWS and SaaS sources.', example: 'aws events put-rule --name my-rule --schedule-expression "rate(5 minutes)"' },
              { name: 'Amazon MQ', desc: 'Managed message broker (ActiveMQ / RabbitMQ).', example: 'aws mq create-broker --broker-name my-broker --engine-type ActiveMQ' },
              { name: 'AppFlow', desc: 'Transfers data between SaaS apps and AWS without code.', example: 'aws appflow create-flow --flow-name my-flow --cli-input-json file://flow.json' },
            ],
          },
          {
            label: 'Analytics',
            items: [
              { name: 'Athena', desc: 'Serverless SQL queries directly against S3 data.', example: 'aws athena start-query-execution --query-string "SELECT * FROM logs LIMIT 10"' },
              { name: 'EMR', desc: 'Managed Hadoop/Spark clusters for big data processing.', example: 'aws emr create-cluster --name my-cluster --release-label emr-6.15.0 --applications Name=Spark' },
              { name: 'Kinesis', desc: 'Real-time streaming data ingestion and processing.', example: 'aws kinesis put-record --stream-name my-stream --data "hello" --partition-key key1' },
              { name: 'Glue', desc: 'Serverless ETL — discovers, prepares, and moves data.', example: 'aws glue start-job-run --job-name my-etl-job' },
              { name: 'QuickSight', desc: 'Managed BI dashboards and visualizations.', example: 'aws quicksight create-dashboard --aws-account-id <id> --dashboard-id my-dash --cli-input-json file://dash.json' },
              { name: 'Lake Formation', desc: 'Sets up secure data lakes on S3 in days.', example: 'aws lakeformation register-resource --resource-arn <arn>' },
              { name: 'MSK', desc: 'Managed Apache Kafka for streaming data pipelines.', example: 'aws kafka create-cluster --cluster-name my-kafka --kafka-version 3.5.1 --cli-input-json file://msk.json' },
            ],
          },
          {
            label: 'Developer Tools',
            items: [
              { name: 'CodePipeline', desc: 'Managed CI/CD pipeline orchestration.', example: 'aws codepipeline start-pipeline-execution --name my-pipeline' },
              { name: 'CodeBuild', desc: 'Managed build service that compiles and tests code.', example: 'aws codebuild start-build --project-name my-build' },
              { name: 'CodeDeploy', desc: 'Automates code deployments to EC2, Lambda, or ECS.', example: 'aws deploy create-deployment --application-name my-app --deployment-group-name prod' },
              { name: 'CodeCommit', desc: 'Managed private Git repository hosting.', example: 'aws codecommit create-repository --repository-name my-repo' },
              { name: 'Cloud9', desc: 'Cloud-based IDE for writing and debugging code.', example: 'aws cloud9 create-environment-ec2 --name my-ide --instance-type t3.small' },
              { name: 'X-Ray', desc: 'Distributed tracing to analyze and debug applications.', example: 'aws xray put-trace-segments --trace-segment-documents file://segment.json' },
            ],
          },
          {
            label: 'Machine Learning',
            items: [
              { name: 'SageMaker', desc: 'Build, train, and deploy machine learning models.', example: 'aws sagemaker create-training-job --training-job-name my-job --cli-input-json file://train.json' },
              { name: 'Rekognition', desc: 'Image and video analysis using pre-trained ML models.', example: 'aws rekognition detect-labels --image \'{"S3Object":{"Bucket":"b","Name":"img.jpg"}}\'' },
              { name: 'Comprehend', desc: 'Natural language processing for text analysis.', example: 'aws comprehend detect-sentiment --text "I love this" --language-code en' },
              { name: 'Lex', desc: 'Builds conversational chatbots and voice interfaces.', example: 'aws lexv2-models create-bot --bot-name my-bot --cli-input-json file://bot.json' },
              { name: 'Polly', desc: 'Converts text into lifelike speech.', example: 'aws polly synthesize-speech --text "Hello" --voice-id Joanna --output-format mp3 out.mp3' },
              { name: 'Textract', desc: 'Extracts text and data from scanned documents.', example: 'aws textract detect-document-text --document \'{"S3Object":{"Bucket":"b","Name":"doc.pdf"}}\'' },
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
              { name: 'Virtual Machines', desc: 'On-demand, scalable compute instances.', example: 'az vm create -n myVM -g myRG --image Ubuntu2204' },
              { name: 'AKS', desc: 'Managed Kubernetes control plane.', example: 'az aks create -n myAKS -g myRG --node-count 3' },
              { name: 'App Service', desc: 'Fully managed hosting for web apps and APIs.', example: 'az webapp up -n myapp --runtime "NODE:18-lts"' },
              { name: 'Azure Functions', desc: 'Event-driven serverless compute.', example: 'az functionapp create -n myfunc -g myRG --consumption-plan-location eastus --runtime node' },
              { name: 'Container Instances', desc: 'Run containers without managing VMs or a cluster.', example: 'az container create -n mycontainer -g myRG --image nginx' },
              { name: 'Azure Container Apps', desc: 'Serverless containers with built-in autoscaling.', example: 'az containerapp create -n myapp -g myRG --image myimage:latest' },
              { name: 'Virtual Machine Scale Sets', desc: 'Auto-scales groups of identical VMs.', example: 'az vmss create -n myScaleSet -g myRG --image Ubuntu2204 --instance-count 3' },
            ],
          },
          {
            label: 'Storage',
            items: [
              { name: 'Blob Storage', desc: 'Object storage for unstructured data.', example: 'az storage blob upload --account-name mystorage -c mycontainer -f file.txt -n file.txt' },
              { name: 'Azure Disk / Files Storage', desc: 'Managed block disks and SMB/NFS file shares.', example: 'az disk create -n myDisk -g myRG --size-gb 128' },
            ],
          },
          {
            label: 'Database',
            items: [
              { name: 'Azure SQL Database', desc: 'Managed relational database service.', example: 'az sql db create -n mydb -g myRG -s myserver --service-objective S0' },
              { name: 'Cosmos DB', desc: 'Globally distributed, multi-model NoSQL database.', example: 'az cosmosdb create -n mycosmos -g myRG' },
              { name: 'Azure Database for MySQL/PostgreSQL', desc: 'Managed open-source relational databases.', example: 'az postgres flexible-server create -n mypg -g myRG' },
              { name: 'Azure Cache for Redis', desc: 'Managed in-memory data store.', example: 'az redis create -n myredis -g myRG --sku Basic --vm-size c0' },
            ],
          },
          {
            label: 'Networking',
            items: [
              { name: 'Virtual Network', desc: 'Isolated private network for Azure resources.', example: 'az network vnet create -n myVNet -g myRG --address-prefix 10.0.0.0/16' },
              { name: 'Azure DNS & Traffic Manager', desc: 'DNS hosting and global traffic routing.', example: 'az network dns zone create -n example.com -g myRG' },
              { name: 'Load Balancer / App Gateway', desc: 'Distributes traffic across VMs and services.', example: 'az network lb create -n myLB -g myRG' },
              { name: 'Application Gateway', desc: 'Layer-7 load balancer with WAF capabilities.', example: 'az network application-gateway create -n myAppGw -g myRG --sku Standard_v2' },
              { name: 'ExpressRoute', desc: 'Private, dedicated connection into Azure.', example: 'az network express-route create -n myCircuit -g myRG --bandwidth 200 --provider "Equinix" --peering-location "Silicon Valley"' },
              { name: 'Azure Bastion', desc: 'Secure RDP/SSH access without public IPs.', example: 'az network bastion create -n myBastion -g myRG --vnet-name myVNet --public-ip-address myBastionIp' },
              { name: 'Azure Firewall', desc: 'Managed, cloud-native network firewall.', example: 'az network firewall create -n myFirewall -g myRG' },
            ],
          },
          {
            label: 'Security & Identity',
            items: [
              { name: 'Entra ID (Azure AD)', desc: 'Identity, single sign-on, and access management.', example: 'az ad user create --display-name "Jane" --user-principal-name jane@contoso.com --password <pwd>' },
              { name: 'Key Vault', desc: 'Stores secrets, keys, and certificates securely.', example: 'az keyvault secret set --vault-name myKV -n dbPassword --value "s3cret"' },
              { name: 'Defender for Cloud', desc: 'Cloud security posture management and threat protection.', example: 'az security auto-provisioning-setting update -n default --auto-provision on' },
              { name: 'Sentinel', desc: 'Cloud-native SIEM and SOAR for security operations.', example: 'az sentinel data-connector list -g myRG --workspace-name myWorkspace' },
            ],
          },
          {
            label: 'Management & Governance',
            items: [
              { name: 'Monitor', desc: 'Metrics, logs, and alerting across Azure resources.', example: 'az monitor metrics list --resource <resourceId> --metric "Percentage CPU"' },
              { name: 'Azure Monitor Log Analytics', desc: 'Centralized log querying with KQL.', example: 'az monitor log-analytics query -w <workspaceId> --analytics-query "AzureActivity | take 10"' },
              { name: 'Azure Policy', desc: 'Enforces organizational rules across resources.', example: 'az policy assignment create --policy <policyId> -n myAssignment' },
              { name: 'Cost Management', desc: 'Tracks and optimizes cloud spend.', example: 'az costmanagement query --type Usage --timeframe MonthToDate --scope /subscriptions/<id>' },
              { name: 'Azure Backup & Site Recovery', desc: 'Backup and disaster recovery for VMs and data.', example: 'az backup vault create -n myVault -g myRG -l eastus' },
              { name: 'Azure Resource Manager (ARM)', desc: 'Deployment and management layer for all Azure resources.', example: 'az deployment group create -g myRG --template-file template.json' },
            ],
          },
          {
            label: 'Integration & Messaging',
            items: [
              { name: 'Service Bus', desc: 'Managed enterprise messaging (queues & topics).', example: 'az servicebus queue create -n myqueue --namespace-name myns -g myRG' },
              { name: 'Event Grid', desc: 'Event routing service for reactive, event-driven apps.', example: 'az eventgrid topic create -n mytopic -g myRG' },
              { name: 'Logic Apps', desc: 'Low-code workflow automation connecting services.', example: 'az logic workflow create -n myworkflow -g myRG --definition workflow.json' },
            ],
          },
          {
            label: 'DevOps',
            items: [
              { name: 'ARM Templates / Bicep', desc: 'Native IaC for declaring Azure resources.', example: 'az bicep build --file main.bicep' },
              { name: 'Azure DevOps', desc: 'Boards, repos, pipelines, and artifacts for CI/CD.', example: 'az devops project create --name myproject' },
              { name: 'Azure Pipelines', desc: 'CI/CD pipeline service, YAML or classic editor.', example: 'az pipelines create --name mypipeline --repository myrepo --yml-path azure-pipelines.yml' },
            ],
          },
          {
            label: 'Data & Analytics',
            items: [
              { name: 'Azure Data Factory', desc: 'Managed ETL/data-integration pipelines.', example: 'az datafactory create -n myADF -g myRG' },
              { name: 'Azure Synapse Analytics', desc: 'Unified data warehouse and big-data analytics.', example: 'az synapse workspace create -n mysynapse -g myRG --storage-account mystorage --sql-admin-login-user admin' },
              { name: 'Azure Databricks', desc: 'Managed Apache Spark analytics platform.', example: 'az databricks workspace create -n mydatabricks -g myRG --sku standard' },
            ],
          },
          {
            label: 'AI',
            items: [
              { name: 'Azure Machine Learning', desc: 'Build, train, and deploy ML models.', example: 'az ml workspace create -n myMLWorkspace -g myRG' },
              { name: 'Azure Cognitive Services', desc: 'Pre-built AI APIs — vision, speech, language.', example: 'az cognitiveservices account create -n mycog -g myRG --kind TextAnalytics --sku S0' },
            ],
          },
          {
            label: 'API Management',
            items: [
              { name: 'Azure API Management', desc: 'Publishes, secures, and monitors APIs.', example: 'az apim create -n myAPIM -g myRG --publisher-email admin@contoso.com --publisher-name "Contoso"' },
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
              { name: 'Compute Engine', desc: 'Configurable virtual machines.', example: 'gcloud compute instances create my-vm --machine-type e2-medium --zone us-central1-a' },
              { name: 'GKE', desc: 'Managed, highly automated Kubernetes clusters.', example: 'gcloud container clusters create my-cluster --num-nodes 3' },
              { name: 'Cloud Run', desc: 'Fully managed serverless containers.', example: 'gcloud run deploy my-app --image gcr.io/project/image --platform managed' },
              { name: 'Cloud Functions', desc: 'Event-driven serverless functions.', example: 'gcloud functions deploy my-fn --runtime nodejs20 --trigger-http' },
              { name: 'App Engine', desc: 'Fully managed platform for web apps, minimal ops.', example: 'gcloud app deploy' },
            ],
          },
          {
            label: 'Storage',
            items: [
              { name: 'Cloud Storage', desc: 'Object storage with configurable durability classes.', example: 'gsutil cp file.txt gs://my-bucket/' },
              { name: 'Persistent Disk', desc: 'Block storage volumes attached to Compute Engine.', example: 'gcloud compute disks create my-disk --size 100GB --zone us-central1-a' },
              { name: 'Filestore', desc: 'Managed NFS file storage.', example: 'gcloud filestore instances create my-nfs --zone us-central1-a --tier STANDARD --file-share name=vol1,capacity=1TB' },
            ],
          },
          {
            label: 'Database',
            items: [
              { name: 'Cloud SQL', desc: 'Managed MySQL, Postgres, and SQL Server.', example: 'gcloud sql instances create my-db --database-version POSTGRES_15 --tier db-f1-micro' },
              { name: 'Cloud Spanner', desc: 'Globally distributed, strongly consistent database.', example: 'gcloud spanner instances create my-spanner --config regional-us-central1 --nodes 1' },
              { name: 'Bigtable', desc: 'Managed wide-column NoSQL for huge analytical/operational workloads.', example: 'gcloud bigtable instances create my-bt --cluster my-cluster --cluster-zone us-central1-a' },
              { name: 'Firestore', desc: 'Managed NoSQL document database for apps.', example: 'gcloud firestore databases create --location us-central' },
              { name: 'Memorystore', desc: 'Managed Redis / Memcached in-memory store.', example: 'gcloud redis instances create my-redis --size 1 --region us-central1' },
            ],
          },
          {
            label: 'Networking',
            items: [
              { name: 'VPC', desc: 'Global virtual network for Google Cloud resources.', example: 'gcloud compute networks create my-vpc --subnet-mode auto' },
              { name: 'Cloud Load Balancing', desc: 'Global, software-defined load balancing.', example: 'gcloud compute forwarding-rules create my-fwd-rule --global --target-http-proxy my-proxy' },
              { name: 'Cloud DNS', desc: 'Managed, scalable DNS hosting.', example: 'gcloud dns managed-zones create my-zone --dns-name example.com --description "my zone"' },
              { name: 'Cloud CDN', desc: 'Caches content at Google\'s edge locations.', example: 'gcloud compute backend-services update my-backend --enable-cdn' },
              { name: 'Cloud NAT', desc: 'Outbound internet access for private instances.', example: 'gcloud compute routers nats create my-nat --router my-router --auto-allocate-nat-external-ips' },
              { name: 'Cloud Armor', desc: 'DDoS protection and WAF at the network edge.', example: 'gcloud compute security-policies create my-policy' },
            ],
          },
          {
            label: 'Security & Identity',
            items: [
              { name: 'IAM', desc: 'Fine-grained access control across resources.', example: 'gcloud projects add-iam-policy-binding my-project --member user:jane@example.com --role roles/editor' },
              { name: 'Secret Manager', desc: 'Stores API keys, passwords, and certificates.', example: 'gcloud secrets create my-secret --data-file=secret.txt' },
              { name: 'Security Command Center', desc: 'Centralized security and risk dashboard.', example: 'gcloud scc findings list my-org-id' },
              { name: 'Cloud KMS', desc: 'Managed encryption key storage and rotation.', example: 'gcloud kms keys create my-key --location global --keyring my-ring --purpose encryption' },
              { name: 'Certificate Manager', desc: 'Provisions and manages TLS certificates.', example: 'gcloud certificate-manager certificates create my-cert --domains example.com' },
            ],
          },
          {
            label: 'Management & Governance',
            items: [
              { name: 'Cloud Monitoring & Logging', desc: 'Metrics, dashboards, and centralized logs.', example: 'gcloud logging read "resource.type=gce_instance" --limit 10' },
              { name: 'Deployment Manager', desc: 'Native IaC via YAML templates.', example: 'gcloud deployment-manager deployments create my-deployment --config config.yaml' },
            ],
          },
          {
            label: 'Data & Analytics',
            items: [
              { name: 'BigQuery', desc: 'Serverless data warehouse for large-scale analytics.', example: 'bq query --use_legacy_sql=false "SELECT * FROM dataset.table LIMIT 10"' },
              { name: 'Pub/Sub', desc: 'Global messaging for event-driven systems.', example: 'gcloud pubsub topics publish my-topic --message "hello"' },
              { name: 'Dataflow', desc: 'Managed stream and batch data processing (Apache Beam).', example: 'gcloud dataflow jobs run my-job --gcs-location gs://template/path' },
              { name: 'Cloud Composer', desc: 'Managed Apache Airflow for workflow orchestration.', example: 'gcloud composer environments create my-env --location us-central1' },
              { name: 'Dataproc', desc: 'Managed Spark and Hadoop clusters.', example: 'gcloud dataproc clusters create my-cluster --region us-central1' },
              { name: 'Looker / Looker Studio', desc: 'BI dashboards and data visualization.', example: 'Connect a BigQuery dataset as a Looker Studio data source (web UI, no CLI)' },
            ],
          },
          {
            label: 'Developer Tools',
            items: [
              { name: 'Cloud Build', desc: 'Managed CI/CD build service.', example: 'gcloud builds submit --tag gcr.io/project/image' },
              { name: 'Artifact Registry', desc: 'Stores container images and language packages.', example: 'gcloud artifacts repositories create my-repo --repository-format docker --location us-central1' },
            ],
          },
          {
            label: 'AI/ML',
            items: [
              { name: 'Vertex AI', desc: 'Unified platform to build, train, and deploy ML models.', example: 'gcloud ai custom-jobs create --region us-central1 --config job.yaml' },
              { name: 'Cloud Vision / Speech / NLP APIs', desc: 'Pre-trained ML APIs for images, speech, and text.', example: 'gcloud ml vision detect-labels image.jpg' },
            ],
          },
          {
            label: 'App Platform',
            items: [
              { name: 'Firebase', desc: 'Mobile/web app backend — auth, database, hosting, analytics.', example: 'firebase deploy --only hosting' },
              { name: 'Anthos', desc: 'Manages Kubernetes across on-prem, GCP, and other clouds.', example: 'gcloud container hub memberships register my-cluster --gke-cluster us-central1-a/my-cluster' },
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
              { name: 'Provider', desc: 'Plugin that talks to a specific API (AWS, Azure, GCP…).', example: 'provider "aws" {\n  region = "us-east-1"\n}' },
              { name: 'Resource', desc: 'A single managed infrastructure object.', example: 'resource "aws_instance" "web" {\n  ami           = "ami-0abcdef"\n  instance_type = "t3.micro"\n}' },
              { name: 'Data Source', desc: 'Reads existing, externally managed information.', example: 'data "aws_ami" "latest" {\n  most_recent = true\n  owners      = ["amazon"]\n}' },
              { name: 'Variable', desc: 'Parameterizes configuration for reuse.', example: 'variable "region" {\n  default = "us-east-1"\n}' },
              { name: 'Output', desc: 'Exposes values from a module after apply.', example: 'output "instance_ip" {\n  value = aws_instance.web.public_ip\n}' },
              { name: 'Module', desc: 'Reusable, packaged bundle of resources.', example: 'module "vpc" {\n  source = "./modules/vpc"\n  cidr   = "10.0.0.0/16"\n}' },
              { name: 'State file', desc: 'Maps configuration to real-world resource IDs.', example: 'terraform show terraform.tfstate' },
              { name: 'Backend', desc: 'Where state is stored (S3, Terraform Cloud, local…).', example: 'terraform {\n  backend "s3" {\n    bucket = "my-tf-state"\n    key    = "prod/terraform.tfstate"\n  }\n}' },
              { name: 'Workspace', desc: 'Isolated state for the same config (dev/stage/prod).', example: 'terraform workspace new staging' },
              { name: 'Provisioner', desc: 'Runs scripts on a resource after creation (escape hatch).', example: 'provisioner "local-exec" {\n  command = "echo done"\n}' },
              { name: 'Plan', desc: 'Preview of changes before they\'re applied.', example: 'terraform plan -out=tfplan' },
              { name: 'Lock file', desc: 'Pins provider versions for reproducible runs.', example: 'terraform providers lock -platform=linux_amd64' },
              { name: 'Import', desc: 'Brings existing infrastructure under Terraform management.', example: 'terraform import aws_instance.web i-0abcdef1234' },
              { name: 'Taint', desc: 'Marks a resource for forced recreation on next apply.', example: 'terraform taint aws_instance.web' },
              { name: 'Local Value', desc: 'Names a repeated expression to avoid duplication.', example: 'locals {\n  name_prefix = "myapp-${var.env}"\n}' },
              { name: 'Count / for_each', desc: 'Creates multiple instances of a resource from one block.', example: 'resource "aws_instance" "web" {\n  count = 3\n  ami   = "ami-0abcdef"\n}' },
              { name: 'Dynamic Block', desc: 'Generates repeated nested blocks programmatically.', example: 'dynamic "ingress" {\n  for_each = var.ports\n  content {\n    from_port = ingress.value\n  }\n}' },
              { name: 'Terraform Registry', desc: 'Public hub for providers and reusable modules.', example: 'terraform init  # pulls from registry.terraform.io automatically' },
              { name: 'Terraform Cloud/Enterprise', desc: 'Hosted runs, remote state, and team collaboration.', example: 'terraform {\n  cloud {\n    organization = "my-org"\n    workspaces { name = "prod" }\n  }\n}' },
              { name: 'Sentinel / OPA', desc: 'Policy-as-code guardrails for what can be applied.', example: 'sentinel apply policy.sentinel' },
              { name: 'Graph', desc: 'Internal dependency graph Terraform builds to order operations.', example: 'terraform graph | dot -Tpng > graph.png' },
              { name: 'Refresh', desc: 'Reconciles state with the real infrastructure\'s current status.', example: 'terraform apply -refresh-only' },
              { name: 'Terraform Console', desc: 'Interactive REPL for evaluating expressions.', example: 'terraform console\n> var.region' },
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
              { name: 'Inventory', desc: 'List of hosts/groups Ansible manages, static or dynamic.', example: '[web]\nweb1.example.com\nweb2.example.com' },
              { name: 'Playbook', desc: 'YAML file defining ordered tasks against hosts.', example: '- hosts: web\n  tasks:\n    - name: install nginx\n      apt: name=nginx state=present' },
              { name: 'Task', desc: 'A single action, usually one module call.', example: '- name: install nginx\n  apt: name=nginx state=present' },
              { name: 'Module', desc: 'Unit of work — copy, apt, service, template, etc.', example: '- name: copy file\n  copy: src=app.conf dest=/etc/app.conf' },
              { name: 'Role', desc: 'Standardized, reusable bundle of tasks/files/handlers.', example: 'roles/webserver/tasks/main.yml' },
              { name: 'Handler', desc: 'Task triggered only when notified (e.g. restart service).', example: 'handlers:\n  - name: restart nginx\n    service: name=nginx state=restarted' },
              { name: 'Template (Jinja2)', desc: 'Generates config files with variable substitution.', example: 'server_name {{ ansible_hostname }};  # inside nginx.conf.j2' },
              { name: 'Facts', desc: 'Auto-collected system data about each managed host.', example: 'ansible web1 -m setup' },
              { name: 'Vault', desc: 'Encrypts sensitive variables and files at rest.', example: 'ansible-vault encrypt group_vars/prod/secrets.yml' },
              { name: 'Collection', desc: 'Distributable bundle of roles, modules, and plugins.', example: 'ansible-galaxy collection install community.general' },
              { name: 'Ansible Galaxy', desc: 'Public hub for sharing roles and collections.', example: 'ansible-galaxy install geerlingguy.nginx' },
              { name: 'AWX / Tower', desc: 'Web UI, scheduling, and RBAC layer over Ansible.', example: 'awx-cli job launch --job-template "Deploy App"' },
              { name: 'ansible.cfg', desc: 'Configuration file controlling Ansible\'s default behavior.', example: '[defaults]\ninventory = ./inventory' },
              { name: 'Variable Precedence', desc: 'Rules for which variable value wins when defined in multiple places.', example: 'ansible-playbook site.yml -e "env=prod"  # extra vars win over all others' },
              { name: 'Conditionals (when)', desc: 'Runs a task only if a condition evaluates true.', example: 'when: ansible_os_family == "Debian"' },
              { name: 'Loops', desc: 'Repeats a task over a list of items.', example: '- name: install packages\n  apt: name={{ item }}\n  loop: [nginx, git, curl]' },
              { name: 'Tags', desc: 'Labels tasks so specific subsets can be run selectively.', example: 'ansible-playbook site.yml --tags "web,db"' },
              { name: 'Dynamic Inventory', desc: 'Generates inventory from cloud APIs (AWS, Azure, GCP…).', example: 'ansible-inventory -i aws_ec2.yml --graph' },
              { name: 'Callback Plugins', desc: 'Customizes how Ansible reports output/events.', example: 'export ANSIBLE_STDOUT_CALLBACK=yaml' },
              { name: 'Check Mode (--check)', desc: 'Dry-run that reports changes without applying them.', example: 'ansible-playbook site.yml --check --diff' },
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
              { name: 'Image', desc: 'Immutable, layered filesystem snapshot of an app.', example: 'docker images' },
              { name: 'Container', desc: 'A running (or stopped) instance of an image.', example: 'docker run -d --name web nginx' },
              { name: 'Dockerfile', desc: 'Instructions describing how to build an image.', example: 'FROM node:20\nCOPY . .\nRUN npm install\nCMD ["npm", "start"]' },
              { name: 'Layer', desc: 'Cached filesystem diff — speeds up rebuilds.', example: 'docker history myimage' },
              { name: 'Volume', desc: 'Persistent storage that outlives a container.', example: 'docker volume create mydata' },
              { name: 'Network', desc: 'Virtual network connecting containers to each other.', example: 'docker network create mynet' },
              { name: 'Registry', desc: 'Stores and distributes images (Docker Hub, ECR, GHCR).', example: 'docker push myrepo/myimage:latest' },
              { name: 'Compose', desc: 'Defines and runs multi-container apps from one YAML file.', example: 'services:\n  web:\n    image: nginx\n    ports: ["80:80"]' },
              { name: 'Buildx', desc: 'Extended builder supporting multi-platform images.', example: 'docker buildx build --platform linux/amd64,linux/arm64 -t app .' },
              { name: 'Swarm', desc: 'Docker\'s native (lightweight) clustering/orchestration.', example: 'docker swarm init' },
              { name: 'Docker Desktop', desc: 'Local dev environment bundling engine + GUI.', example: 'Open Docker Desktop → Settings (GUI app, no CLI equivalent)' },
              { name: 'Healthcheck', desc: 'Defines how Docker verifies a container is functioning.', example: 'HEALTHCHECK CMD curl -f http://localhost/ || exit 1' },
              { name: 'Bind Mount', desc: 'Maps a host filesystem path directly into a container.', example: 'docker run -v $(pwd):/app node:20' },
              { name: 'Multi-stage Build', desc: 'Uses multiple FROM stages to keep final images small.', example: 'FROM golang AS build\nRUN go build -o app\nFROM alpine\nCOPY --from=build /app /app' },
              { name: '.dockerignore', desc: 'Excludes files from the build context, like .gitignore.', example: 'node_modules\n.git' },
              { name: 'Docker Hub', desc: 'Default public registry for pulling and pushing images.', example: 'docker pull nginx:latest' },
              { name: 'Docker Context', desc: 'Switches the CLI between local and remote Docker engines.', example: 'docker context use remote-server' },
              { name: 'Docker Scout', desc: 'Scans images for known vulnerabilities.', example: 'docker scout cves myimage:latest' },
              { name: 'Entrypoint / CMD', desc: 'Defines the default process a container runs on start.', example: 'ENTRYPOINT ["./start.sh"]' },
              { name: 'Restart Policy', desc: 'Controls whether Docker auto-restarts a stopped container.', example: 'docker run --restart unless-stopped nginx' },
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
              { name: 'Chart', desc: 'Packaged bundle of Kubernetes manifest templates.', example: 'helm create mychart' },
              { name: 'Release', desc: 'A specific deployed instance of a chart.', example: 'helm list' },
              { name: 'values.yaml', desc: 'Default configuration values a chart is templated with.', example: 'replicaCount: 3\nimage:\n  repository: nginx\n  tag: latest' },
              { name: 'Template', desc: 'Go-templated Kubernetes YAML inside a chart.', example: '{{- range .Values.items }}\nname: {{ . }}\n{{- end }}' },
              { name: 'Repository', desc: 'Index of charts that can be installed by name.', example: 'helm repo add bitnami https://charts.bitnami.com/bitnami' },
              { name: 'Hook', desc: 'Runs jobs at points in a release lifecycle (pre/post-install).', example: 'annotations:\n  "helm.sh/hook": pre-install' },
              { name: 'Dependency', desc: 'Sub-charts a chart relies on.', example: 'dependencies:\n  - name: redis\n    version: "17.x"\n    repository: "https://charts.bitnami.com/bitnami"' },
              { name: 'Rollback', desc: 'Reverts a release to a previous revision.', example: 'helm rollback myapp 2' },
              { name: 'Helm Hub / Artifact Hub', desc: 'Searchable index of publicly published charts.', example: 'helm search hub wordpress' },
              { name: 'helmfile', desc: 'Declarative spec for managing many Helm releases at once.', example: 'releases:\n  - name: myapp\n    chart: ./mychart' },
              { name: 'Chart.yaml', desc: 'Metadata file describing a chart\'s name, version, and dependencies.', example: 'apiVersion: v2\nname: mychart\nversion: 0.1.0' },
              { name: 'Lint', desc: 'Validates a chart\'s templates and structure before install.', example: 'helm lint ./mychart' },
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
              { name: 'Pipeline', desc: 'Code-defined sequence of build/test/deploy stages.', example: "pipeline { agent any; stages { stage('Build') { steps { sh 'make build' } } } }" },
              { name: 'Stage / Step', desc: 'A labeled phase of a pipeline / a single action within it.', example: "stage('Test') { steps { sh 'make test' } }" },
              { name: 'Agent / Node', desc: 'A machine (or container) that executes pipeline work.', example: "agent { label 'linux' }" },
              { name: 'Executor', desc: 'A slot on an agent that can run one job at a time.', example: 'Manage Jenkins → Nodes → set "# of executors"' },
              { name: 'Jenkinsfile', desc: 'Pipeline definition checked into source control.', example: 'Jenkinsfile at repo root — auto-detected by Multibranch Pipeline' },
              { name: 'Plugin', desc: 'Extends Jenkins — SCM, notifications, cloud integrations.', example: 'Manage Jenkins → Plugins → Install "Slack Notification"' },
              { name: 'Shared Library', desc: 'Reusable Groovy code shared across pipelines.', example: "@Library('my-shared-lib') _\nmyLibFunction()" },
              { name: 'Multibranch Pipeline', desc: 'Auto-creates a pipeline per branch/PR in a repo.', example: 'New Item → Multibranch Pipeline → point at repo URL' },
              { name: 'Credentials Store', desc: 'Securely stores tokens, keys, and passwords.', example: "withCredentials([usernamePassword(credentialsId: 'db-creds', usernameVariable: 'U', passwordVariable: 'P')]) { sh 'deploy.sh' }" },
              { name: 'Blue Ocean', desc: 'Visual pipeline editor and run visualization UI.', example: 'Open "Blue Ocean" from the Jenkins sidebar to view a pipeline visually' },
              { name: 'Trigger (webhook/poll/cron)', desc: 'What starts a build — push, PR, schedule, or manual.', example: "triggers { cron('H 2 * * *') }" },
              { name: 'Artifact Archiving', desc: 'Saves build outputs for later stages or download.', example: "archiveArtifacts artifacts: 'build/*.jar'" },
              { name: 'Post Actions', desc: 'Steps that always run after a stage/pipeline (success/failure).', example: "post { failure { mail to: 'team@x.com', subject: 'Build failed' } }" },
              { name: 'Parameters', desc: 'User-supplied inputs when manually triggering a build.', example: "parameters { string(name: 'VERSION', defaultValue: '1.0') }" },
              { name: 'Distributed Builds', desc: 'Master delegates work to multiple agent nodes in parallel.', example: "agent { label 'docker-agent' }" },
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
              { name: 'Workflow', desc: 'YAML file in .github/workflows defining automation.', example: '.github/workflows/ci.yml' },
              { name: 'Job', desc: 'A set of steps that run together on one runner.', example: 'jobs:\n  build:\n    runs-on: ubuntu-latest' },
              { name: 'Step', desc: 'A single command or reusable Action inside a job.', example: '- run: npm test' },
              { name: 'Action', desc: 'Reusable packaged unit of automation logic.', example: '- uses: actions/setup-node@v4' },
              { name: 'Runner', desc: 'The VM/container that executes a job (hosted or self-hosted).', example: 'runs-on: ubuntu-latest' },
              { name: 'Trigger (on:)', desc: 'Event that starts a workflow — push, PR, schedule…', example: 'on:\n  push: { branches: [main] }\n  pull_request: {}' },
              { name: 'Secrets', desc: 'Encrypted values injected into workflows at runtime.', example: '${{ secrets.NPM_TOKEN }}' },
              { name: 'Matrix', desc: 'Runs a job across multiple OS/version combinations.', example: 'strategy:\n  matrix:\n    node: [18, 20, 22]' },
              { name: 'Artifact', desc: 'Files persisted between jobs or after a run.', example: '- uses: actions/upload-artifact@v4\n  with: { name: build, path: dist/ }' },
              { name: 'Environment', desc: 'Deployment target with its own secrets/protection rules.', example: 'environment: production' },
              { name: 'Reusable Workflow', desc: 'A workflow called from other workflows to avoid duplication.', example: 'uses: ./.github/workflows/build.yml' },
              { name: 'Composite Action', desc: 'Bundles multiple steps into a single reusable Action.', example: 'runs:\n  using: "composite"\n  steps: [...]' },
              { name: 'Cache', desc: 'Speeds up runs by reusing dependencies between builds.', example: "- uses: actions/cache@v4\n  with: { path: ~/.npm, key: npm-${{ hashFiles('package-lock.json') }} }" },
              { name: 'Marketplace', desc: 'Public catalog of prebuilt community/official Actions.', example: '- uses: docker/build-push-action@v5' },
              { name: 'Dependabot', desc: 'Automated dependency update PRs, integrates with workflows.', example: 'version: 2\nupdates:\n  - package-ecosystem: "npm"\n    directory: "/"\n    schedule: { interval: "weekly" }' },
              { name: 'GITHUB_TOKEN', desc: 'Auto-generated token scoped to the repo for a workflow run.', example: '${{ secrets.GITHUB_TOKEN }}' },
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
              { name: 'Scrape Target', desc: 'An endpoint Prometheus polls for /metrics.', example: "scrape_configs:\n  - job_name: 'app'\n    static_configs: [{ targets: ['localhost:9100'] }]" },
              { name: 'Exporter', desc: 'Translates a system\'s stats into Prometheus format.', example: './node_exporter --web.listen-address=:9100' },
              { name: 'PromQL', desc: 'Query language for slicing and aggregating metrics.', example: 'rate(http_requests_total[5m])' },
              { name: 'Recording Rule', desc: 'Precomputes expensive queries into new time series.', example: 'groups:\n  - name: example\n    rules:\n      - record: job:http_requests:rate5m\n        expr: rate(http_requests_total[5m])' },
              { name: 'Alerting Rule', desc: 'Defines conditions that fire alerts.', example: '- alert: HighErrorRate\n  expr: rate(http_errors_total[5m]) > 0.05\n  for: 10m' },
              { name: 'Alertmanager', desc: 'Dedupes, groups, and routes alerts to Slack/email/PagerDuty.', example: "route:\n  receiver: 'slack'\nreceivers:\n  - name: 'slack'\n    slack_configs: [{ channel: '#alerts' }]" },
              { name: 'Service Discovery', desc: 'Auto-finds scrape targets (Kubernetes, EC2, Consul…).', example: 'kubernetes_sd_configs:\n  - role: pod' },
              { name: 'Remote Write', desc: 'Ships samples to long-term/external storage.', example: 'remote_write:\n  - url: "https://remote-storage/api/v1/write"' },
              { name: 'TSDB', desc: 'Prometheus\' built-in time-series storage engine.', example: 'promtool tsdb list-block /data' },
              { name: 'Node Exporter', desc: 'Exposes host-level metrics — CPU, memory, disk, network.', example: 'curl localhost:9100/metrics' },
              { name: 'Federation', desc: 'One Prometheus server scrapes summarized data from another.', example: "/federate?match[]={job=\"prometheus\"}" },
              { name: 'Pushgateway', desc: 'Accepts metrics from short-lived batch jobs that can\'t be scraped.', example: 'echo "my_metric 42" | curl --data-binary @- http://pushgateway:9091/metrics/job/my_job' },
              { name: 'Labels', desc: 'Key-value pairs that identify and filter time series.', example: 'http_requests_total{method="GET", status="200"}' },
              { name: 'Blackbox Exporter', desc: 'Probes endpoints over HTTP/TCP/ICMP for uptime checks.', example: "- job_name: 'blackbox'\n  metrics_path: /probe\n  params: { module: [http_2xx] }" },
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
              { name: 'Dashboard', desc: 'A collection of panels visualizing related data.', example: 'POST /api/dashboards/db  { "dashboard": { "title": "Ops" } }' },
              { name: 'Panel', desc: 'A single chart, table, or stat visualization.', example: '{ "type": "timeseries", "title": "CPU", "targets": [{ "expr": "rate(cpu[5m])" }] }' },
              { name: 'Data Source', desc: 'Connection to a backend — Prometheus, Loki, SQL, etc.', example: 'POST /api/datasources  { "name": "Prometheus", "type": "prometheus", "url": "http://prom:9090" }' },
              { name: 'Alert Rule', desc: 'Threshold-based condition that triggers a notification.', example: '{ "condition": "B", "data": [{ "refId": "A", "expr": "up == 0" }] }' },
              { name: 'Variable', desc: 'Dropdown filter that dynamically changes dashboard queries.', example: 'label_values(node_exporter_build_info, instance)' },
              { name: 'Annotation', desc: 'Marks events (deploys, incidents) directly on graphs.', example: 'POST /api/annotations  { "text": "Deploy v1.2", "time": 1717000000000 }' },
              { name: 'Plugin', desc: 'Adds new panels, data sources, or apps to Grafana.', example: 'grafana-cli plugins install grafana-piechart-panel' },
              { name: 'Playlist', desc: 'Cycles through a set of dashboards automatically.', example: 'POST /api/playlists  { "name": "Ops", "interval": "1m" }' },
              { name: 'Folder', desc: 'Organizes dashboards and controls access permissions.', example: 'POST /api/folders  { "title": "Production" }' },
              { name: 'Explore', desc: 'Ad-hoc query and log exploration outside of dashboards.', example: 'Explore tab → pick data source → run ad-hoc query' },
              { name: 'Loki', desc: 'Grafana Labs\' log aggregation system, queried like Prometheus.', example: '{app="web"} |= "error"' },
              { name: 'Tempo', desc: 'Grafana Labs\' distributed tracing backend.', example: 'Search by traceID=abc123 in the Tempo data source' },
              { name: 'Notification Channel', desc: 'Where alerts are sent — Slack, email, PagerDuty, webhook.', example: 'POST /api/alert-notifications  { "type": "slack", "settings": { "url": "..." } }' },
              { name: 'Team & RBAC', desc: 'Controls who can view/edit dashboards and data sources.', example: 'POST /api/teams  { "name": "sre-team" }' },
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
              { name: 'KV Secrets Engine', desc: 'Simple key-value storage for static secrets.', example: 'vault kv put secret/myapp key=value' },
              { name: 'Database Secrets Engine', desc: 'Generates short-lived database credentials on demand.', example: 'vault write database/roles/my-role db_name=mydb creation_statements="CREATE ROLE..."' },
              { name: 'PKI Secrets Engine', desc: 'Issues and manages dynamic TLS certificates.', example: 'vault write pki/issue/my-role common_name=example.com' },
              { name: 'Transit Engine', desc: 'Encryption-as-a-service without storing the data itself.', example: 'vault write transit/encrypt/my-key plaintext=$(base64 <<< "secret")' },
              { name: 'Auth Method', desc: 'How a client proves identity — token, AppRole, Kubernetes…', example: 'vault auth enable approle' },
              { name: 'Policy', desc: 'HCL rules defining what an identity can access.', example: 'path "secret/data/myapp" {\n  capabilities = ["read"]\n}' },
              { name: 'Lease', desc: 'Time-bound validity attached to a dynamic secret.', example: 'vault lease renew <lease_id>' },
              { name: 'Seal / Unseal', desc: 'Encrypts Vault\'s storage; unsealing is required to operate.', example: 'vault operator unseal <key>' },
              { name: 'Namespace', desc: 'Isolated, multi-tenant Vault environment (Enterprise).', example: 'vault namespace create my-team' },
              { name: 'AppRole', desc: 'Machine-to-machine auth method using role/secret IDs.', example: 'vault write auth/approle/role/my-role token_policies="my-policy"' },
              { name: 'Kubernetes Auth', desc: 'Lets Pods authenticate to Vault using their service account token.', example: 'vault write auth/kubernetes/role/my-role bound_service_account_names=my-sa' },
              { name: 'Audit Device', desc: 'Logs every request/response to Vault for compliance.', example: 'vault audit enable file file_path=/var/log/vault_audit.log' },
              { name: 'Unwrap / Response Wrapping', desc: 'One-time-use tokens for securely delivering secrets.', example: 'vault unwrap <wrapping_token>' },
              { name: 'Vault Agent', desc: 'Auto-authenticates and caches/renews secrets for an app.', example: 'vault {\n  address = "https://vault:8200"\n}' },
            ],
          },
        ],
      },
    ],
  },
];
