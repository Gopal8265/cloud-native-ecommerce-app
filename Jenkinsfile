pipeline {
    agent any

    environment {
        IMAGE_NAME = "cloud-native-ecommerce-app-backend"
        CONTAINER_NAME = "ecommerce-backend"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Environment') {
            steps {
                sh '''
                echo "PATH=$PATH"
                which docker
                which docker-credential-desktop
                docker --version
                docker compose version
                '''
            }
     }

        stage('Deploy Application') {
            steps {
                sh '''
                /usr/local/bin/docker compose down || true
                /usr/local/bin/docker compose up -d
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '/usr/local/bin/docker ps'
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully!'
        }

        failure {
            echo 'Deployment failed.'
        }
    }
}