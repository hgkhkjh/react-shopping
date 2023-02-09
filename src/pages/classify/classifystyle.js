import styled from 'styled-components';

const Mystyle = styled.div`
display: flex;
.adm-side-bar-item-active{
   color:${props => props.color} !important
}
.adm-side-bar-item-highlight{
   background: ${props => props.color} !important
}
.listcontext{
   display: inline-block;
 text-align: center;
width: 100%;
}

.adm-side-bar-item{
   font-size: 1.5rem;
   height: 6rem;
}
.listcontexticon{
   padding:0rem 3rem !important;
}
.adm-side-bar{
   width: 13rem;
}
.listtitle{
   padding-top: 1rem;
   font-size: 2rem;
   color:${props => props.color} !important;
   
 text-align: center;
}
.adm-side-bar{
    /* position: relative;
    z-index: -1; */
   }
.listcontexttitle{
   text-align: center;
   font-size: 1.5rem;
}
.listcontexticon{
   text-align: center;
   padding: 1rem
}
.listbody{
   display: grid;
grid-template-columns: 1fr 1fr;
}
`
export default Mystyle    