<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, LOGIN');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');


    $con = new mysqli('localhost', 'root', '', 'segundocursoenvolvendophp');

    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        //Pegando as informações do banco de dados
        if(isset($_GET['id'])){
            //Esse if é usado caso de passagem de ID
            $id = $_GET['id'];
            $sql = $con->query("select * from clientes where id='$id'");
            $data = $sql->fetch_assoc();
        }else{
            //Entra nesse caso não tenha passagem de ID via 'get'
            $data = array();
            $sql = $con->query("select * from clientes");
            while($d = $sql->fetch_assoc()){
                $data[] = $d;
            }
        }
        exit(json_encode($data));
    }

    if($_SERVER['REQUEST_METHOD'] === 'PUT'){
        //alterar informações
        if(isset($_GET['id'])){
            $id = $_GET['id'];
            $data = json_decode(file_get_contents("php://input"));
            $sql = $con->query("update clientes set
                nome = '".$data->nome."',
                cidade = '".$data->cidade."',
                email = '".$data->email."',
                senha_original = '".$data->senha_original."'

                where id = '$id'");
            if($sql){
                exit(json_encode(array('status' => 'Sucesso')));
            }else{
                exit(json_encode(array('status' => 'Nao Funcionou')));
            }
        }
    }


    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        //gravar informações
        $data = json_decode(file_get_contents("php://input"));
        $sql = $con->query("insert into clientes(nome, cidade, email, senha_original) values
        ('".$data->nome."',
        '".$data->cidade."',
        '".$data->email."',
        '".$data->senha_original."')");
        if($sql){
            $data->id = $con->insert_id;
            exit(json_encode($data));
        }else{
            exit(json_encode(array('status' => 'Nao Funcionou')));
        }
    }


    if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
        //apagar informações do banco
        if(isset($_GET['id'])){
            $id = $_GET['id'];
            $sql = $con->query("delete from clientes
                where id='$id'");
            if($sql){
                exit(json_encode(array('status' => 'Sucesso em deletar')));
            }else{
                exit(json_encode(array('status' => 'Falha em deletar')));
            }
        }
    }


    if($_SERVER['REQUEST_METHOD'] === 'LOGIN'){
      $nome = $_GET['nome'];
      $senha_original = $_GET['senha_original'];

      $sql = $con->query("select * from clientes where
      nome='$nome' and senha_original='$senha_original'");


    }

?>
