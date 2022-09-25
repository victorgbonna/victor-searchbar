import styles from './Searchbar.module.css'
import { useState } from 'react'

export default function Searchbar() {
    const [errorObj, setErrorObj]= useState('')
    const [foundPath, setFoundPath]= useState('')
    const [inputMsg, setInputMsg]= useState('')
    const searchObj= {
        user: {
            id: [1, 'James'],
            name: {
            firstName: "James",
            lastName: "Ibori"
            },
            location: {
            city: "Ikoyi",
            state: "Lagos",
            address: "One expensive house like that"
            }
        }
        }

    // const varToString = varObj => Object.keys({varObj})[0]
    const checkInArray=({arr, search, current_path})=>{
        console.log("it is array", {current_path})

        //loop through array
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            //if the item is a string and it is the search query, return the path + index
            if (item==search){
                return current_path+'['+i+']'
            }
            //if the item is an array
            if(Array.isArray(item)){
                for (let j = 0; j < item.length; j++) {
                    //recusive function with a new path and arr
                    const isItThereReturnPath=checkInArray({arr:item, search, 
                        current_path:current_path+'['+i+']'+'['+j+']'})
                    //stop flow and return path if return value is not null
                    if(isItThereReturnPath) return isItThereReturnPath
                }
            }   
            //if the item is an object
            if(typeof item === 'object' && item !== null && !Array.isArray(item)){
                //recusive function with a new path and obj
                const isItThereReturnPath=checkInObj({obj:item, search,
                    current_path: current_path+'['+i+'].'})
                //stop flow and return path if return value is not null
    
                if(isItThereReturnPath) return isItThereReturnPath
            } 
        }
        return null
    }
    const checkInObj=({obj, search, current_path})=>{
        console.log('it is obj', {current_path})
        //loop through the object keys
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const element = obj[key];
                //if element is not an object or an array, and it also equals to the search value. Stop the flow and return the path
                if(element==search){
                    return current_path+ key
                }
                // if element (item) is an array                
                if(Array.isArray(element)){
                    //recusive function with a new path and arr
                    const isItThereReturnPath= checkInArray({arr:element, search, current_path: current_path+ key})
                    //stop flow and return path if return value is not null
                    if(isItThereReturnPath){
                        return isItThereReturnPath
                    }
                }
                // if element (item) is an object
                if(typeof element === 'object' && element !== null && !Array.isArray(element)){
                    //recusive function with a new path and obj
                    const isItThereReturnPath= checkInObj({obj:element, search, current_path: current_path+ key+'.'})
                    //stop flow and return path if return value is not null
                    if(isItThereReturnPath){
                        return isItThereReturnPath
                    }
                }


            }
        }
        return null
    }

    const getSearchQueryPath=({arr, inputMsg})=>{
        //initiate the variable name path
        let path_name= 'variable'
        
        //confirm variable is an object
        if (typeof arr === 'object' && arr !== null && !Array.isArray(arr)){
            //recursive function for object, returns string path if function returns what is needed
            const isItThereReturnPath= checkInObj({obj:arr, search:inputMsg, current_path:path_name+'.'})
            if(isItThereReturnPath) return setFoundPath(`the word ${inputMsg} is at ${isItThereReturnPath}`)
        }

        //confirm if variable is an array
        if (Array.isArray(arr)){
            //recursive function for array, returns string path if function returns what is needed
            const isItThereReturnPath= checkInArray({arr, search:inputMsg, current_path:path_name})
            if(isItThereReturnPath) return setFoundPath(`the word ${inputMsg} is at ${isItThereReturnPath}`)
        }
        //if nothing or null is being returned
        return setErrorObj('Nothing found')
    }
  return (
    <div className={styles.tabdiv}>
        <h2>Press Enter or click the search button</h2>
        <div className={styles.tabinp}>
        <input type="text" placeholder="search..." onChange={(e)=> {
            
            setInputMsg(e.target.value)
        }}
        value={inputMsg}
        onKeyDown={(e)=>{
            // console.log(e.key)
            if(e.key=="Enter"){
                setFoundPath('');
                setErrorObj('');
                getSearchQueryPath({arr:searchObj,inputMsg})

            }
        }}/>
        <svg onClick={()=>{
                setFoundPath('');
                setErrorObj('');
                getSearchQueryPath(
                    {arr:searchObj,inputMsg})
        }}
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            d="M19.1837 20.5999L14.6726 16.0889C12.9778 17.4247 10.8368 18.0625 8.68727 17.8719C6.53777 17.6813 4.54222 16.6766 3.10891 15.0635C1.67559 13.4503 0.912725 11.3505 0.976337 9.19352C1.03995 7.03652 1.9253 4.98532 3.45119 3.45943C4.97708 1.93354 7.0282 1.04825 9.1852 0.984638C11.3422 0.921026 13.442 1.6839 15.0552 3.11721C16.6684 4.55053 17.6731 6.546 17.8637 8.6955C18.0543 10.845 17.4165 12.9861 16.0807 14.6809L20.5927 19.1929C20.7515 19.3847 20.833 19.6289 20.8213 19.8776C20.8096 20.1263 20.7056 20.3618 20.5296 20.5378C20.3535 20.7139 20.118 20.818 19.8693 20.8296C19.6206 20.8413 19.3765 20.7598 19.1847 20.6009L19.1837 20.5999ZM2.96267 9.44194C2.96256 10.7141 3.33744 11.9581 4.04042 13.0183C4.74341 14.0786 5.74333 14.9081 6.91518 15.4033C8.08703 15.8984 9.37879 16.0371 10.629 15.8021C11.8793 15.5671 13.0326 14.9688 13.9447 14.0819C13.9637 14.0589 13.9846 14.0359 14.0056 14.0149C14.0266 13.9939 14.0497 13.9729 14.0727 13.9539C14.8117 13.1937 15.3525 12.2636 15.6477 11.2453C15.9429 10.227 15.9834 9.15173 15.7656 8.11412C15.5478 7.07652 15.0785 6.10831 14.3987 5.29467C13.719 4.48103 12.8496 3.84687 11.8673 3.44797C10.885 3.04907 9.81972 2.89764 8.76516 3.007C7.71059 3.11636 6.69904 3.48317 5.81948 4.07515C4.93992 4.66714 4.21929 5.46618 3.72097 6.40199C3.22264 7.3378 2.96194 8.38172 2.96169 9.44194H2.96267Z"
            fill="#99B2C6"
            />
        </svg>
        </div>
        {(errorObj || foundPath) && 
            <p style={errorObj?{color:"red"}:{color:"green"}}>{errorObj || foundPath}</p>
        }

    </div>
  )
}

