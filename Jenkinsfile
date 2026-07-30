pipeline {
    agent any

    environment {
        DOCKER_USERNAME = "gopal82"

        BACKEND_IMAGE = "${DOCKER_USERNAME}/ecommerce-backend"
        FRONTEND_IMAGE = "${DOCKER_USERNAME}/ecommerce-frontend"

        IMAGE_TAG = "${BUILD_NUMBER}"

        PATH = "/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                sh '''
                docker build -t $BACKEND_IMAGE:$IMAGE_TAG ./backend
                docker tag $BACKEND_IMAGE:$IMAGE_TAG $BACKEND_IMAGE:latest
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh '''
                docker build -t $FRONTEND_IMAGE:$IMAGE_TAG ./frontend
                docker tag $FRONTEND_IMAGE:$IMAGE_TAG $FRONTEND_IMAGE:latest
                '''
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push Images') {
            steps {
                sh '''
                docker push $BACKEND_IMAGE:$IMAGE_TAG
                docker push $BACKEND_IMAGE:latest

                docker push $FRONTEND_IMAGE:$IMAGE_TAG
                docker push $FRONTEND_IMAGE:latest
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl set image deployment/ecommerce-backend \
                ecommerce-backend=$BACKEND_IMAGE:$IMAGE_TAG

                kubectl set image deployment/ecommerce-frontend \
                ecommerce-frontend=$FRONTEND_IMAGE:$IMAGE_TAG
                '''
            }
        }

        stage('Wait for Rollout') {
            steps {
                sh '''
                kubectl rollout status deployment/ecommerce-backend --timeout=180s
                kubectl rollout status deployment/ecommerce-frontend --timeout=180s
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                echo "========== Pods =========="
                kubectl get pods

                echo ""
                echo "========== Services =========="
                kubectl get svc

                echo ""
                echo "========== Deployments =========="
                kubectl get deployments
                '''
            }
        }

        stage('Cleanup') {
            steps {
                sh '''
                docker image prune -f
                '''
            }
        }
    }

    post {

        success {
            echo "Application deployed successfully to Kubernetes."
        }

        failure {
            sh '''
            echo "Deployment failed."

            kubectl rollout undo deployment/ecommerce-backend || true
            kubectl rollout undo deployment/ecommerce-frontend || true
            '''
        }

        always {
            cleanWs()
        }
    }
}