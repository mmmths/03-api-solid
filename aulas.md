node js - caso de uso de design patterns
class > Inversão de dependências

SOLID - divided into 5 principles

- D - Dependency Inversion Principle
   > We change how our use case or any part of the application accesses its dependencies.
   > We invert the order of how the dependencies arrive in our use case.
   > We receive the dependencies as parameters.
   > Every class of use case will only have one method
   > Instead of our class instantiating the dependencies it needs, it will receive the dependencies as parameters.



Factory Pattern 
--> create things in common
-> code that is used in different parts of the application, and receives a lot of dependencies can use the Factory pattern


TDD -> test-driven development
- > create test before 
-> First step of TDD is called RED (test error)
-> GREEN - code minimun as possible
-> REFECTOR 



JWT: JSON Web Token
usuário faz login -> envia e-mail e senha -> back-end cria um token ÚNICO e não-modificável e STATELESS
STATELESS:  não aramazenado em nenhuma estrutura e persistência de dados (banco de dados)
Back-end: Quando vai criar o TOKEN ele usa uma PALAVRA-CHAVE (string)
Palavra-chave: bfjkabefkabdfab dbadbsabbcfsabdfbsabfasbfsdafdf23434243324243
E-mail/senha -> (token é composto de  header.payload.sign)
Login => JWT 
JWT => Todas as requisições dali para frente
Eviar o JWT através de um Header (cabeçalho): Authorization: Bearer HWT



CI/CD
CI -> Continuous Integration - estratégias e workflows que criamos para integração de código contíinuo 
-> validação de novos códigos que estão chegando está vindo corretamente 
GitHub Action

CD -> Continuous Deployment/Delivery
