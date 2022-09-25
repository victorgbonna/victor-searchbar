This was an search assignment given to me. 

Basically you will be given a search query and a variable - of any data type to search from. 

The task is to type a function that will loop through the search variable and return the variable path the search query is located at. 

The tricky part is that the search variable can be of any data type and incase so, put in the index of the path.
The codebase is on a NextJs environment and the necessary files are the pages/index.js importing the searchbar component. The searchbar contains the functionality. There are 3 functions for the execution of the task, which are :- the checkInArray, checkInObject and the main function. 
cthe main function takes the necessary arguments then checks if the "derived path variable" is an array or object. if it is an array, it calls the recursive checkInArray function to handle it likewise the recursive checkInObj handles it, if it is an object. They can keep on switching functions as far as the key value/item has not gotten the search query but the data type becomes different. It will keep doing this until it goes to the last item/key of the "derived path variable ", if the search query not found yet. 
I believe it is working because I have ran about 4 distinct tests on it and confirmed. Comments are there for easy readability.
Please do not judge my CSS, I am actually so good in it but I was too focused on the logic.
