pipeline {
    agent any

    stages {

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
