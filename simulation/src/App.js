import React from 'react';

import { Line, Circle, } from 'draw-shape-reactjs';



class App extends React.Component {
  constructor(){
    super()
    this.state = {
      vertices : [
      ],
      edges : [

      ],
      total_nodes : '',
      active_nodes : '',
      count : 0,
      gamma : '',
      beta : ''

    }
    this.updateVertices = this.updateVertices.bind(this);
    this.onChangeNodes = this.onChangeNodes.bind(this);
  }
  startInterval(){
    this.timer = setInterval(this.updateVertices, 100);
  }

  onChangeNodes(e){
    var nodes = e.target.value
    this.setState({[e.target.name] : nodes})
    console.log("hi")
    var data = []
    for (var i = 0 ; i <nodes ; i++){
      var num1 = Math.floor(Math.random() * 460) + 40  
      var num2 = Math.floor(Math.random() * 200) + 70  
      var node_data = {
        x : num1,
        y : num2,
        color : "green"
      }
      data.push(node_data)
    }
    this.setState({vertices : data})
    console.log(data)
  }

  onChangeActive(e){
    var nodes = e.target.value
    this.setState({ [e.target.name]: nodes })
    var vertices = this.state.vertices;
    for (var i =0 ; i<nodes; i++){
      vertices[i].color = "red"
    }
    this.setState({vertices : vertices});
  }

  onChange(e){
    this.setState({[e.target.name] : e.target.value});
  }

  updateVertices(){
    var vertices = this.state.vertices;
    for (var i=0;i<vertices.length ; i++){
      var randm = Math.random()*10
      var jump = Math.floor(randm)
      if(randm < 2.5){
        if (vertices[i].x <500)
          vertices[i].x += jump
        if (vertices[i].y < 270)
          vertices[i].y += jump
      }
      else if(randm < 6){
        if(vertices[i].x < 500)
          vertices[i].x += jump
        if(vertices[i].y > 70)
          vertices[i].y -= jump
      }
      else if(randm < 7){
        if (vertices[i].x > 40)
          vertices[i].x -= jump
        if (vertices[i].y < 270)
          vertices[i].y += jump
      }
      else{
        if (vertices[i].x > 40)
          vertices[i].x -= jump
        if (vertices[i].y > 70)
          vertices[i].y -= jump
      }
    }
    //console.log(vertices)
    //this.setState({vertices:vertices})
    this.updateEdges()
  }


  OnSimulate(){
    var cnt = this.state.count;
    if(cnt%2==0){
      this.startInterval();
    }
    else{
      clearInterval(this.timer);
    }
    cnt+=1
    this.setState({count : cnt})
  }

  updateEdges(){
    var vertices = this.state.vertices;
    for (var i = 0; i < vertices.length; i++) {
      if(vertices[i].color === "red"){
        for (var j = 0; j < vertices.length; j++) {
          if(vertices[j].color === "green"){
            if (Math.abs(vertices[i].x - vertices[j].x) * Math.abs(vertices[i].x - vertices[j].x) + Math.abs(vertices[i].y - vertices[j].y) * Math.abs(vertices[i].y - vertices[j].y) <= this.state.beta * 100) {
              vertices[j].color = "blue";
            }
          }
        }
      }
    }
    this.setState({vertices : vertices});
  }

  render() {
    return (
      <div className='App'>
        <div className = "row">
          
          <div className = "b1"
            style={{
              zIndex: "100",
              minHeight: "95vh",
              margin : "20px",
              border: "1px solid #a2c48d",
              boxShadow: "2px 2px 3px #bfbfbf",
              borderRadius: "15px",
              position : "fixed",
              width : "35%"
            }}
          >
            <div style={{ color: "#a2c48d", fontSize : "25px", textAlign : "center", padding : "20px"}}>
              SNA Project : Input parameters
            </div>
            <div className="form-group" style={{ color: "#996560", fontSize : "19px", fontWeight : "600", marginRight : "100px", marginBottom : "20px", marginTop : "40px"}}>
              <label className ="ml-2">Enter the number of nodes:</label>
              <input
                type="number"
                className="form-control"
                name="total_nodes"
                required
                value={this.state.total_nodes}
                onChange={this.onChangeNodes}
                style = {{
                  border: "1px solid #a2c48d",
                  boxShadow: "2px 2px 3px #bfbfbf",
                  borderRadius: "15px",
                }}
              />
            </div>
            <div className="form-group" style={{ color: "#996560", fontSize: "19px", fontWeight: "600", marginRight: "100px", marginBottom: "20px" }}>
              <label className="ml-2">Active nodes:</label>
              <input
                type="number"
                className="form-control"
                name="active_nodes"
                required
                value={this.state.nodes}
                onChange={(e)=>this.onChangeActive(e)}
                style={{
                  border: "1px solid #a2c48d",
                  boxShadow: "2px 2px 3px #bfbfbf",
                  borderRadius: "15px",
                }}
              />
            </div>
            <div className="form-group" style={{ color: "#996560", fontSize: "19px", fontWeight: "600", marginRight: "100px", marginBottom: "20px" }}>
              <label className="ml-2">Probability of conversion from susceptible to infected (Beta):</label>
              <input
                type="number"
                className="form-control"
                name="beta"
                required
                value={this.state.beta}
                onChange={(e) => this.onChange(e)}
                style={{
                  border: "1px solid #a2c48d",
                  boxShadow: "2px 2px 3px #bfbfbf",
                  borderRadius: "15px",
                }}
              />
            </div>
            <div className="form-group" style={{ color: "#996560", fontSize: "19px", fontWeight: "600", marginRight: "100px", marginBottom: "80px" }}>
              <label className="ml-2">Prob to convert from infected to recoverable (Gamma):</label>
              <input
                type="number"
                className="form-control"
                name="gamma"
                required
                value={this.state.gamma}
                onChange={(e)=>this.onChange(e)}
                style={{
                  border: "1px solid #a2c48d",
                  boxShadow: "2px 2px 3px #bfbfbf",
                  borderRadius: "15px",
                }}
              />
            </div>
            <div>
              <button className="btn" style={{
                backgroundColor: "#effce8" ,
                  color: "black",
                  width: "90%",
                  margin: "5px 0px",
                  borderRadius: "0px 20px 20px 0px"
                }}
                onClick = {()=>this.OnSimulate()}
              >
                Simulate / Stop
            </button>
            </div>
          </div>
          <div className = "b2">
            <div
              style={{
                minHeight: "40vh",
                marginTop : "30px",
                border: "1px solid #a2c48d",
                boxShadow: "2px 2px 3px #bfbfbf",
                borderRadius: "15px",
                position : "fixed",
                left : "50%",
                width : "35%"
              }}
            >
              <div style={{ color: "#a2c48d", fontSize: "25px", textAlign: "center", padding: "10px" }}>
                SNA Project : Simulation
              </div>
              
              <svg width="500" height="300">
                {this.state.vertices ? (
                  this.state.vertices.map((data, index) => (
                      <>
                      <circle class="circle" cx={data.x} cy={data.y} r="3" fill = {data.color} />
                      </>
                  ))
                ) : ''}
              </svg>

 
              {/* <Circle 
                    center={[data.x, data.y]} 
                    radius={2} 
                    color={data.color}
                    zIndex = {100}
                  /> */}
              {/* 
            {this.state.edges ? (
              this.state.edges.map((data, index) => (
                <div key={index}>
                  <Line
                    from={[data.x1, data.y1]}
                    to={[data.x2, data.y2]}
                    color='#1DBFE7'
                    zIndex={10}
                  />
                </div>
              ))
            ) : ''} */}
            </div>
            <div
              style={{
                minHeight: "40vh",
                border: "1px solid #a2c48d",
                boxShadow: "2px 2px 3px #bfbfbf",
                borderRadius: "15px",
                top : "54%",
                left : "37%",
                width : "62%",
                position : "fixed"
              }}
            >
              <div style={{ color: "#a2c48d", fontSize: "25px", textAlign: "center", padding: "10px" }}>
                SNA Project : Results
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
