<script>
  document.getElementById("demo").onclick = function() {multiplication_table()};
  multiplication_table(){
    var n1;
    var count;
    var multiplication;
    var table = [];
    n1 = prompt("Type a number:");//lê e armazena na variavel n1;
    for(count = 0; count<=10 ; count++){//for (inicialização; condição; incremento);
      multiplication = n1 * count;
      table[count] = multiplication; //realiza a multiplicationada
    }
    alert("Multiplication table of"+n1+":"+table);
  }
</script>

<p id="demo" class="md-button md-button--primary">Try yourself</p>
