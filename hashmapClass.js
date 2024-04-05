class myNode{
constructor(){
    this.key=null;
    this.value=null;
    this.next=null;
    this.prev=null;
}
}

class myDll{

    constructor(){
        this.head=null;
        this.tail=null;
    }

    isEmpty()
    {
        return this.head===null;
    }

    add(key,value){
        const newNode = new myNode();
        newNode.key=key;
        newNode.value=value;
        if(this.head==null){
            this.head=this.tail=newNode;
            
        }
        else{
            newNode.prev=this.tail;
            this.tail.next=newNode;
            this.tail=newNode;
        }
    }

    display()
    {
        let str='';
        let temp=this.head;
        while(temp!=null){
            str+=`[${temp.key},${temp.value}] ->`;
            temp=temp.next;
        }
        return str+'null';
    }

    removeNode(key){
        let node= this.find(key);
        if(node!==null){
            if(this.head===this.tail)
                {
                    this.head=this.tail=null;
                }
                else if(node===this.head){
                    this.head=this.head.next;
                    this.head.prev=null;
                }
                else if(node===this.tail){
                    this.tail=this.tail.prev;
                    this.tail.next=null;
                }
                else{
                    node.prev.next=node.next;
                    node.next.prev=node.prev;
                }

                return true;
        }
        return false;
    }

    find(key){
        let temp = this.head;
        while(temp!==null)
        {
            if(temp.key===key)
            return temp;

            temp=temp.next;
        }
        return null;
    }
}




class MyHashMap{
constructor()
{
    this.bucketSize=31;
    this.length=0;
    this.bucketArr=Array.from({length:this.bucketSize},()=>new myDll);
}

    hash(key=''){
        let hashCode =0;
        const primeNumber = this.bucketSize;
        for(let i=0;i<key.length;i++){
            hashCode= (i+1)*hashCode + key.charCodeAt(i);
            hashCode=hashCode%primeNumber;
        }
        return hashCode;
    }

    set(key,value){
        const hashIndex= this.hash(key);
        let bucket=this.bucketArr[hashIndex];
        if(bucket.find(key)!==null)
        {
            bucket.value=value;
        }
        else{
            bucket.add(key,value);
            this.length+=1;
        }
    }

    get(key){
        let hashIndex= this.hash(key);
        let bucket = this.bucketArr[hashIndex];
        if(!bucket.isEmpty()){
            if(bucket.find(key)!==null)
            {
                return bucket.find(key).value;
            }
        }
        return null;
    }

    remove(key){
        let hashIndex= this.hash(key);
        let bucket= this.bucketArr[hashIndex];
        if(!bucket.isEmpty()){
            let res= bucket.removeNode(key);
            if(res){
                this.length-=1;
            }
            return res;
        }
        return false;
    }    

    clear(){
        this.bucketArr.forEach((bucket)=>{
            bucket.head=null;
            bucket.tail=null;
        });
    }

    entries(){
        let entriesArr=[];
        this.bucketArr.forEach((bucket)=>{
            if(!bucket.isEmpty()){
                let node = bucket.head;
                while(node!==null){
                    entriesArr.push([node.key,node.value]);
                    node=node.next;
                }
            }
        });
        return entriesArr;
    }

    keys()
    {
        let keysArr= [];
        this.bucketArr.forEach((bucket)=>{
            if(!bucket.isEmpty()){
                let node = bucket.head;
                while(node!==null){
                    keysArr.push(node.key);
                    node=node.next;
                }
            }
        });
        return keysArr;
    }

    values()
    {
        let valuesArr= [];
        this.bucketArr.forEach((bucket)=>{
            if(!bucket.isEmpty()){
                let node = bucket.head;
                while(node!==null){
                    valuesArr.push(node.value);
                    node=node.next;
                }
            }
        });
        return valuesArr;
    }
    
}



