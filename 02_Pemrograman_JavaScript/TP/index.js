const arr = [2,0,26,28,-2]

function mulOfArray(arr){
    let result = 1
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if(arr[index] >= 0){
            result = result * arr[index]
        }       
    }
    return result
}

console.log(mulOfArray(arr))