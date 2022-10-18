# Multiplication Table


> JS script that returns the multiplication table of the input number.

## Code

>A simple script in which the input number is multiplicated by 0 to 10 and then it shows the results.

```javascript title="Multiplication Table javascript"
   var n1;
   var count;
   var result = [];
   function times(n1,count){
      return n1 * count;
   }
   function execute(){
      n1 = prompt("Input a number: ");
      for(count = 0;count <= 10; count ++){
         result.push(n1 + "x" + count + "=" + times(n1,count));
      }
      alert(result);
   }
```

<script>
   var n1;
   var count;
   var result = [];
   function times(n1,count){
      return n1 * count;
   }
   function execute(){
      n1 = prompt("Input a number: ");
      for(count = 0;count <= 10; count ++){
         result.push(n1 + "x" + count + "=" + times(n1,count));
      }
      alert(result.join("\n"));
   }
</script>

## Live Execution

>Hit the button and try it yourself.

<button class="md-button md-button--primary" onclick="execute();">Try Yourself</button>