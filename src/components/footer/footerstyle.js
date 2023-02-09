import styled from 'styled-components';

const Mystyle = styled.div`
.adm-tab-bar-item-active{
   color: ${props => props.color} !important
}
.adm-tab-bar{
   z-index: 999;
}

.adm-tab-bar-item-title-with-icon{
   font-size: 1rem;
   margin-bottom: -7px;
}
.adm-tab-bar-item-icon{
   height: 2.5rem;
    font-size: 2.5rem;
}
.adm-tab-bar-item{
   height: 5rem;
}
`
export default Mystyle