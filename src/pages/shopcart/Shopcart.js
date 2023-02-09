import styled from 'styled-components';

const Mystyle = styled.div`
.adm-checkbox-icon{
   border-color: ${props => props.checkcolor} !important;
   color: ${props => props.checkcolor} !important;
    background-color:  transparent !important;
    width: 2rem;
    height: 2rem;
    margin-right: -0.5rem;
}
.adm-empty-description{
   margin-top: 2rem;
    font-size: 2rem !important;
}
.cartitem{
   display: flex;
    align-items: center;
}
.adm-swipe-action-actions-right{
   width: 8rem;
}

.adm-button::before{
   transform: translate(calc(50rem* -1), calc(50rem * -1))
}
.cartitemimg{
   display: inline-block;
    width: 67%;
}
.adm-checkbox{
   margin: 0rem 0.5rem;
}
.cartitemimg{
   width: 16rem;
    margin: 1rem 0rem;
    height: 16rem;
}
.cartitemtitle{
   margin: 0rem 0.8rem;
}
.cartitemprice{
   display: grid;
    grid-template-columns: 3fr 1fr;
    font-size: 1.3rem;
    margin-top: 2rem;
}
svg{
   font-size: 1rem;
}
.adm-stepper{
   height: 2.5rem;
    width: 6rem;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
}
.adm-button{
   width: 1rem;
    font-size: 0.5rem;
}
.adm-stepper-minus, .adm-stepper-plus{
   width: 2rem !important;
}
.adm-button-shape-rectangular{
   width: 1rem;
    font-size: 0.5rem;
}
.adm-button{
   width: 1rem;
    font-size: 0.5rem;
}
.adm-button-shape-rectangular{
   width: 1rem;
    font-size: 0.5rem;
}
.adm-swipe-action-action-button{
   width: 100%;
    font-size: 2rem !important;
}
.cartcalc{
   background-color:#ffff; 
   position: fixed;
    bottom: 7rem;
    overflow: hidden;
    width: 100%;
    border-top: 1px solid #f4f1f1;
    border-bottom: 1.5px solid #f4f1f1;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.totalpricecontainer{
   display: grid;
    grid-template-columns: 1fr 1fr;
    -ms-flex-pack: start;
    justify-content: end;
    -ms-flex-align: center;
    -ms-flex-line-pack: space-around;
    width: 25rem;
    height: 6rem;
    line-height: 6rem;
    justify-items: center;
}
.totalprice{
   font-size: 2rem;
}
.gobug{
   margin-left: 0.1rem;
    width: 100%;
    line-height: 6rem;
    font-size: 2rem;
    text-align: center;
    height: 100%;
    z-index: 99;
    
}
.adm-checkbox-content{
   font-size: 2rem !important;
}
`
export default Mystyle