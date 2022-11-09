/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/
import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetUsersQuery } from '../../features/users/usersSlice'
import { BtnSuccess } from '../../styles/Button.Styled'
import { ButtonContent, Header, HomeContainer, HomeItem, HomeLogo, HomeWrapper, Links, Logo, Paragraph, Span } from '../../styles/styledHome/Home.Styled'
import Experiences from '../experiences/Experiences'
import { Hearts, Grid } from 'react-loading-icons'


const Home = () => {

  const { userId } = useParams()

  const {
    user,
    isLoading: isLoadingUser,
    isSuccess: isSuccessUser,
    isError: isErrorUser
  } = useGetUsersQuery('getUsers', {
    selectFromResult: ({ data, isLoading, isSuccess, isError }) => ({
      user: data?.entities[userId],
      isLoading,
      isSuccess,
      isError
    })
  });

  let name, description, image;


  if (isLoadingUser) {
    name = <Header> <Span></Span></Header>
    //description = <Paragraph> <Hearts stroke='#98ff98' strokeWidth={10} speed={.75} /></Paragraph>
    image = <><Hearts fill="#d52344" stroke='#841a1a' height='3em' speed={1} />Loading...</>

  } else if (isSuccessUser) {
    name = <Header>Hi, i'm  <Span>{user?.name}</Span>👨🏾‍💻</Header>
    description = <Paragraph> {user?.description}</Paragraph>
    image = <Logo src={user?.image} alt='Avatar' />
  } else if (isErrorUser) {
    name = <Span>Error!!!</Span>
    //description = <Paragraph> </Paragraph>
    image = <><Grid fill="#d52344" stroke='#841a1a' height='3em' speed={1} />Error!!!</>
  }

  return (
    <HomeContainer>
      <HomeWrapper>
        <HomeLogo>
          {image}
          <HomeItem>
            {name}
            {description}
            <ButtonContent>
              <Links to='/contact'>
                <BtnSuccess>CV-Download</BtnSuccess>
              </Links>
            </ButtonContent>
          </HomeItem>
        </HomeLogo>
      </HomeWrapper>
      <>
        <Experiences />
      </>
    </HomeContainer>
  )
}

export default Home
