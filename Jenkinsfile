pipeline {
    agent any

    stages {
        stage('Construir y desplegar la app') {
            steps {
                script {
                    // Construir la imagen Docker
                    bat 'docker build -t my-react-app .'

                    // Ejecutar el contenedor Docker
                    bat 'docker run -p 1574:80 my-react-app'
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
