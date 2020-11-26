import React from "react";
import ReactDOM from 'react-dom';
 
class TodoList extends React.Component{
    //构造函数
    constructor(){
        //super()超级继承React
        super();
        //声明state状态名为myList的数组和myInput字符串
        this.state={
            myList:[],
            myInput:""
        }
    }
    //生命周期方法在渲染之前调用
    UNSAFE_componentWillMount(){
        // 获取本地数据赋值给myList
        var myList = window.localStorage.getItem("myList");
        //判断myList是否是空的
        if(myList === null || myList === ""){
            //如果myList什么都没有，就让它等一个空数组
            myList=[]
        }else{
            //如果myList不是空的，拿到的数据是字符串需要通过split进行转换成数组
            myList = myList.split(",")
        }
        //把转换过的数组赋值给this.setState名为myList
        this.setState({
            myList:myList
        })
         
    }
    //添加的点击事件
    handleAddClick(){
        //拿到input的值
        var val = this.refs.myInput.value;
        //把input的值清空
        this.refs.myInput.value=this.state.myInput;
        //添加数据到this.state的myList
        this.setState({
            myList:[...this.state.myList,val]
        },()=>{
            //修改本地数据
            window.localStorage.setItem("myList",this.state.myList)
        })
    }
    //删除的点击事件
    handleDeleteClick(index){
        //获取this.state的myList数组，赋值给arr
        var arr = this.state.myList;
        //删除index下标的数据，后边的1是删除一条
        arr.splice(index,1)
        //删除过后重新赋值给this.state的myList
        this.setState({
            myList:arr
        },()=>{
            //修改本地数据
            window.localStorage.setItem("myList",this.state.myList)
        })
    }
    //修改的点击事件
    handleUpdateClick(index){
        //获取this.state的myList数组，赋值给arr
        var arr =  this.state.myList;
        //同过prompt获取要修改的内容
        var str = prompt("请输入修改内容");
        //判断是不是确认修改
        if(str!=null){
            //在arr数组中找到下标index,设置修改个数为1，修改的内容为str
            arr.splice(index,1,str);
            //修改过后把this.state的myList数据修改成给改过的数据
            this.setState({
                myList:arr
            },()=>{
                //修改本地数据
                window.localStorage.setItem("myList",this.state.myList)
            })
        }
    }
    //绑定键盘事件
    keyDown(e){
        //判断键盘按下的数字码是不是enter
       if(e.keyCode === 13){
           //如果是enter的编码，执行添加的点击事件
           this.handleAddClick();
       }
    }
    //清空的点击事件
    handleClearClick(){
        //直接把this.state的myList赋值成为空数组
        this.setState({
            myList:[]
        },()=>{
            //修改本地数据
            window.localStorage.setItem("myList",this.state.myList)
        })
    }
 
    // 渲染
    render(){
        return(
            <React.Fragment>
            {/* input是搜索框 button第一个是添加 button第二个是清空 */}
                <input ref="myInput" onKeyDown={this.keyDown.bind(this)} type="text"/><button onClick={this.handleAddClick.bind(this)}>添加</button><button onClick={this.handleClearClick.bind(this)}>清空</button>
                <ul>
                    {/* 通过map循环遍历this.state的myList 渲染页面 给第一个button绑定删除事件 给第二个button修改事件 */}
                    {this.state.myList.map((m,index) => {return <li key={index}>{m} <button onClick={this.handleDeleteClick.bind(this,index)}>删除</button><button onClick={this.handleUpdateClick.bind(this,index)}>修改</button></li>})}
                </ul>
            </React.Fragment>
        );
    }
}
//渲染页面
ReactDOM.render(<TodoList />,document.querySelector("#root"))
