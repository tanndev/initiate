#!/usr/bin/env groovy

pipeline {
    agent {
        label 'nodejs && docker'
    }

    stages {

        stage('Build') {
            steps {
                echo 'Building...'
                // Build the image.
                script {
                    image = docker.build("jftanner/initiate")
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Testing...'
                // TODO Actually test something
            }
        }

        stage('Release') {
            when {
                branch 'master'
            }
            steps {
                // TODO Replace with SemanticRelease
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        image.push('latest')
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'master'
            }
            steps {
                script {
                    sshagent(['jenkins.ssh']) {
                        sh 'ssh docker.tanndev.com rm -rf initiate'
                        sh 'ssh docker.tanndev.com mkdir initiate'
                        sh 'scp docker-compose* docker.tanndev.com:initiate/'
                        sh 'ssh docker.tanndev.com "cd initiate && docker-compose pull"'
                        sh 'ssh docker.tanndev.com "cd initiate && docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d"'
                    }


                    slackSend channel: '#initiate', color: 'good', message: "Deployed <https://initiate.tanndev.com|Initiate>. (<${env.BUILD_URL}console|Build Console>)"
                }
            }
        }
    }

    post {
        failure {
            slackSend channel: '#initiate', color: 'danger', message: "Failed to build/publish Initiate. (<${env.JOB_URL}|Pipeline>) (<${env.BUILD_URL}console|Build Console>)"
        }
    }
}
