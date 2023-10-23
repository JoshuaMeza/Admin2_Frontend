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
                bat '''
                    SETLOCAL EnableDelayedExpansion
                    SET "contenedores="

                    FOR /F "tokens=*" %%A IN ('docker ps --filter "name=backend" --format "{{.Names}}"') DO (
                        SET "contenedores=!contenedores! %%A"
                    )

                    SET contadoresCount=0
                    FOR %%B IN (!contenedores!) DO (
                        SET /A contadoresCount+=1
                    )

                    IF !contadoresCount! equ 1 (
                        echo Solo hay un contenedor por detener
                        FOR %%B IN (!contenedores!) DO (
                            docker stop %%B
                        )
                    ) ELSE (
                        echo No hay contenedores backend por detener
                    )
                '''
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
