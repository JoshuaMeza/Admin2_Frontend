pipeline {
    agent any

    parameters {
        string(name: 'BUILD_NUMBER', defaultValue: '', description: 'Número de versión')
    }

    environment {
        BRANCH_NAME = "${GIT_BRANCH.split("/")[1]}"
        buildNumber = "${params.BUILD_NUMBER}"
        buildNumberWithoutQuotes = buildNumber.replace("'", "")
    }

    stages {
        stage('Detener contenedores') {
            steps {
                script {
                    def containers = bat(script: 'docker ps --filter "name=frontend" --format "{{.Names}}"', returnStdout: true).trim()
                    def countersArray = containers.tokenize()
                    
                    if (containersArray.size() > 0) {
                        echo 'Deteniendo contenedores previos...'
                        for (container in containersArray) {
                            bat 'docker stop ${container}'
                        }
                    } else{
                        echo 'No se encontraron contenedores previos para detener.'
                    }
                }
            }
        }

        stage('Instalar Dependencias') {
            steps {
                bat 'composer install'
            }
        }

        stage('Construir la app') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Ejecutar Front') {
            steps {
                bat 'npm run dev'
            }
        }

        stage('Construir Imagen') {
            steps {
                script {
                    def timestamp = new Date().format('yyyyMMddHHmmss')
                    def uniqueIdentifier = buildNumberWithoutQuotes.isEmpty() ? timestamp : buildNumberWithoutQuotes
                    bat "docker build -t store-backend-${BRANCH_NAME}:${uniqueIdentifier} ."
                }
            }
        }

        stage('Desplegar Imagen') {
            steps {
                bat "docker run -d -p 5174:80 --name ams-frontend-${uniqueIdentifier} ams-frontend-${BRANCH_NAME}:${uniqueIdentifier}"
            }
        }
    }

    post {
        success {
            echo '¡El segundo pipeline se ha completado exitosamente!'
        }
        failure {
            echo 'El segundo pipeline ha fallado!'
        }
    }
}
