import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
`;

export const ImageWrapper = styled.div`
  width: 120px;
  height: 167px;
  position: relative;
`;

export const ProductTitle = styled.a`
  color: #333;
  font-size: 20px;
  transition: all 0.3s;
  &:hover {
    color: #783f8e;
  }
`;
