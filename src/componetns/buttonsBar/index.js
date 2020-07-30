// import React, {Component} from "react";
// import {connect} from "react-redux";
//
// import {
//     loadNextPage
// } from "../../actions"
//
//
//
//
// class ButtonsBar extends Component {
//
//
//     render() {
//         const {loadNextPage} = this.props;
//         const numb = this.props.data;
//         const array = this.props.array;
//         return (
//             <div>
//                 <button onClick={(e)=> loadNextPage(numb, array)}>
//                     {numb}
//                 </button>
//             </div>
//         )
//
//     }
// }
//
// // const mapStateToProps = (state) => {
// //     const {people} = state;
// //     console.log("this.state")
// //     console.log(state)
// //     return {
// //         people: people
// //     }
// // };
//
//
// const mapDispatchToProps = {
//     loadNextPage
// };
//
// export default connect(null, mapDispatchToProps)(ButtonsBar)
