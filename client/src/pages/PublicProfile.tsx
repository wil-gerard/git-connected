import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import tw from 'twin.macro';
import { UserCard } from '../components/UserCard';
import { useUserContext } from '../hooks/UserContext';
import { SanitizedUser } from '../interface';
import { useParams } from 'react-router-dom';
import clientApi from '../api/clientApi';

const Container = tw.div`relative w-full px-10 lg:mx-auto pb-64`;
const Content = tw.div`flex flex-col mx-auto items-center`;

export default function PublicProfile() {
  const { currentUser } = useUserContext();
  const { id } = useParams();

  const [queriedUser, setQueriedUser] = useState<SanitizedUser>();
  useEffect(() => {
    clientApi.get(`/api/user/getuserbyid/${id}`).then((res: AxiosResponse) => {
      setQueriedUser(res.data);
    });
  }, [currentUser]);

  if (!queriedUser) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Container>
        <Content>
          <UserCard {...queriedUser} />
        </Content>
      </Container>
    </>
  );
}
