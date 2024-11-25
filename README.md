# UNIBOOK

## What is Unibook?

Unibook is a platform that allows you to download books from Italian e-book publishers. (Currently, it supports only HubSchool.)

## Features
- Download books from supported publishers.
- Easy deployment with Docker.
- Configurable storage using MinIO.
- Public instance available for testing.
- Integrated PDF viewer

## Deployment Instructions

1. Download the [docker-compose.example.yml](https://raw.githubusercontent.com/MouadLahlal/unibook/refs/heads/main/docker-compose.example.yml) file and rename it by removing .example from the file name.
2. Set up a [Minio instance](https://min.io/docs/minio/kubernetes/upstream/index.html). Once MinIO is running, you need to:
    - [Create a bucket](https://min.io/docs/minio/linux/administration/console/managing-objects.html#minio-console-buckets) named unibook.
    Generate an access key and a secret key.
    - [Generate an access key and a secret key](https://min.io/docs/minio/linux/administration/console/security-and-access.html#minio-console-security-access).
3. Download the [.env.example](https://raw.githubusercontent.com/MouadLahlal/unibook/refs/heads/main/.env.example) file, rename it by removing .example, and configure the required environment variables.
4. To start the `unibook` and `db` containers, run the following command:

    ```bash
    docker compose up -d
    ```
