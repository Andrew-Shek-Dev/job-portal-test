# Styled Components
## Introduction
TBC

## Installation
```
yarn add styled-components
yarn add -D @types/styled-components
```

## How to use in component?
Basic case,
```tsx
import react from 'React';
import styled from 'styled-components';//<--

const Container = styled.div`
    text-align:center
`//<--

const home = () => {
  return (
    <Container>home</Container>{/*//<--*/}
  )
}

export default home
```

If the css file is extracted in single file,
```tsx
//home.ts
import react from 'React';
import {Container} from '../styles/home.style';

const home = () => {
  return (
    <Container>home</Container>
  )
}

export default home
```

```ts
//home.style.ts
import styled from "styled-components";

export const Container = styled.div`
    text-align:center
`
```