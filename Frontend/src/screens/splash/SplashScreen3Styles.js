import { StyleSheet } from "react-native";

export default StyleSheet.create({

container:{
flex:1,
},

safeArea:{
flex:1,
paddingHorizontal:28,
paddingBottom:30,
justifyContent:"space-between",
},

skipContainer:{
alignSelf:"flex-end",
marginTop:10,
},

skipText:{
fontSize:18,
color:"#B9BCD9",
fontWeight:"500",
},

imageContainer:{
alignItems:"center",
marginTop:10,
},

imageGlow:{
position:"absolute",
width:330,
height:330,
borderRadius:165,
backgroundColor:"rgba(90,100,255,0.08)",
},

image:{
width:320,
height:320,
},

textContainer:{
alignItems:"center",
},

title:{
fontSize:34,
fontWeight:"700",
color:"white",
textAlign:"center",
lineHeight:44,
},

description:{
marginTop:20,
fontSize:18,
color:"#A8ACC7",
textAlign:"center",
lineHeight:31,
},

indicatorContainer:{
flexDirection:"row",
justifyContent:"center",
alignItems:"center",
},

activeDot:{
width:16,
height:16,
borderRadius:8,
backgroundColor:"#5F67FF",
marginHorizontal:7,
},

inactiveDot:{
width:12,
height:12,
borderRadius:6,
backgroundColor:"#595D72",
marginHorizontal:7,
},

buttonRow:{
flexDirection:"row",
justifyContent:"space-between",
},

backButton:{
width:"40%",
height:60,
borderWidth:1,
borderColor:"#40445C",
borderRadius:18,
justifyContent:"center",
alignItems:"center",
},

backText:{
color:"#A9ACC5",
fontSize:22,
},

nextButton:{
width:"56%",
borderRadius:18,
overflow:"hidden",
},

buttonGradient:{
height:60,
justifyContent:"center",
alignItems:"center",
flexDirection:"row",
},

nextText:{
color:"white",
fontSize:22,
marginRight:10,
fontWeight:"600",
},

});