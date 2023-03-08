<?php

include_once('conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);


if($postjson['requisicao'] == 'add'){

    $senha_cript = md5($postjson['senha']);

    $query = $pdo->prepare("INSERT INTO usuarios SET nome = :nome, usuario = :usuario, senha = :senha, senha_original = :senha_original, nivel = :nivel ");
  
       $query->bindValue(":nome", $postjson['nome']);
       $query->bindValue(":usuario", $postjson['usuario']);
       $query->bindValue(":senha", $senha_cript);
       $query->bindValue(":senha_original", $postjson['senha']);
       $query->bindValue(":nivel", $postjson['nivel']);
       $query->execute();
  
       $id = $pdo->lastInsertId();
       
  
      if($query){
        $result = json_encode(array('success'=>true, 'id'=>$id));
  
        }else{
        $result = json_encode(array('success'=>false));
    
        }
     echo $result;





    
}else if($postjson['requisicao'] == 'listar'){

    if($postjson['nome'] == ''){
        $query = $pdo->query("SELECT * from usuarios order by id desc limit $postjson[start], $postjson[limit]");
    }else{
      $busca = $postjson['nome'] . '%';
      $query = $pdo->query("SELECT * from usuarios where nome LIKE '$busca' or usuario LIKE '$busca' order by id desc limit $postjson[start], $postjson[limit]");
    }


    $res = $query->fetchAll(PDO::FETCH_ASSOC);

 	for ($i=0; $i < count($res); $i++) { 
      foreach ($res[$i] as $key => $value) {
      }
 		$dados[] = array(
 			'id' => $res[$i]['id'],
 			'nome' => $res[$i]['nome'],
			'usuario' => $res[$i]['usuario'],
            'senha' => $res[$i]['senha'],
            'senha_original' => $res[$i]['senha_original'],
            'nivel' => $res[$i]['nivel'],
            
        
 		);

 }

        if(count($res) > 0){
                $result = json_encode(array('success'=>true, 'result'=>$dados));

            }else{
                $result = json_encode(array('success'=>false, 'result'=>'0'));

            }
            echo $result;

}




else if($postjson['requisicao'] == 'editar'){
    
    $senha_cript = md5($postjson['senha']);

    $query = $pdo->prepare("UPDATE usuarios SET nome = :nome, usuario = :usuario, senha = :senha, senha_original = :senha_original, nivel = :nivel where id = :id");
  
       $query->bindValue(":nome", $postjson['nome']);
       $query->bindValue(":usuario", $postjson['usuario']);
       $query->bindValue(":senha", $senha_cript);
       $query->bindValue(":senha_original", $postjson['senha']);
       $query->bindValue(":nivel", $postjson['nivel']);
       $query->bindValue(":id", $postjson['id']);
       $query->execute();
  
       $id = $pdo->lastInsertId();
       
  
      if($query){
        $result = json_encode(array('success'=>true, 'id'=>$id));
  
        }else{
        $result = json_encode(array('success'=>false));
    
        }
     echo $result;

    }




    else if($postjson['requisicao'] == 'excluir'){
    
            
        $query = $pdo->query("DELETE FROM usuarios where id = '$postjson[id]'");
      
                 
      
          if($query){
            $result = json_encode(array('success'=>true));
      
            }else{
            $result = json_encode(array('success'=>false));
        
            }
         echo $result;
    
        }





        else if($postjson['requisicao'] == 'login'){

         
          $query = $pdo->query("SELECT * from usuarios where usuario = '$postjson[usuario]' and senha_original = '$postjson[senha]'");
          
          $res = $query->fetchAll(PDO::FETCH_ASSOC);
      
         for ($i=0; $i < count($res); $i++) { 
            foreach ($res[$i] as $key => $value) {
            }
           $dados = array(
             'id' => $res[$i]['id'],
             'nome' => $res[$i]['nome'],
            'usuario' => $res[$i]['usuario'],
                  'senha' => $res[$i]['senha'],
                  'senha_original' => $res[$i]['senha_original'],
                  'nivel' => $res[$i]['nivel'],
                  
              
           );
      
       }
      
              if(count($res) > 0){
                      $result = json_encode(array('success'=>true, 'result'=>$dados));
      
                  }else{
                      $result = json_encode(array('success'=>false, 'msg'=>'Dados Incorretos!'));
      
                  }
                  echo $result;
      
      }
      

?>
