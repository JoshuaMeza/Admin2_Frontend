pipeline {
    agent any

    stages {
        stage('Construir y desplegar la app') {
            steps {
                script {
                    // Construir la imagen Docker
                    bat 'docker-compose build'

                    // Ejecutar el contenedor Docker
                    bat 'docker-compose up -d'
                }
            }
        }
    }

    post {
        success {
            echo '¡El pipeline se ha completado exitosamente!'
        }
        failure {
            echo 'El pipeline ha fallado!'
        }
    }
}
