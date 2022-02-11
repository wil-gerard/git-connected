import axios, { AxiosResponse } from 'axios'
import tw from 'twin.macro'
import { css } from 'styled-components/macro'; //eslint-disable-line
import { ReactComponent as TwitterIcon } from '../assets/twitter-icon.svg'
import { ReactComponent as GitHubIcon } from '../assets/github-icon.svg'
import { ReactComponent as DiscordIcon } from '../assets/discord-icon.svg'
import { myContext } from '../hooks/Context'
import React, { useEffect, useState, useContext } from 'react'
import { IUser } from '../interface'

const Content = tw.div`flex flex-col justify-center px-6 text-gray-100`

const Header = tw.header`px-5 py-4 border-b border-gray-100`

const H2 = tw.h2`font-semibold text-gray-300`

const TableContainer = tw.div`w-full max-w-2xl mx-auto shadow-lg rounded bg-secondary-800`

const Table = tw.table`table-auto w-full`

const TablePadding = tw.div`p-3`

const TableThead = tw.thead`text-xs font-semibold uppercase text-gray-300 bg-secondary-700`

const TableRow = tw.tr``

const TableHeader = tw.th`p-2 whitespace-nowrap font-semibold text-left`

const TableBody = tw.tbody`text-sm divide-y divide-gray-100`

const TableDataCell = tw.td`p-2 whitespace-nowrap`

const TableDataNameContainer = tw.div`flex items-center`

const TableDataImage = tw.img`w-10 h-10 flex-shrink-0 mr-2 sm:mr-3 rounded-full`

const TableDataName = tw.div`font-medium text-gray-100`

const TableDataLocation = tw.div`font-medium text-gray-100 text-left`

const TableActions = tw.div`font-medium text-gray-100 text-left flex flex-row`

const TableLink = tw.a`flex items-center justify-center rounded shadow cursor-pointer bg-secondary-600 transition duration-300 hocus:bg-primary-500 w-6 h-6 ml-1 p-0.5`

const TableFollow = tw.a`flex items-center justify-center rounded shadow cursor-pointer bg-secondary-600 transition duration-300 hocus:bg-primary-500  ml-1 py-0.5 px-2`


export default function Home() {
  const ctx = useContext(myContext)
  const [twitterFollowStatus, setTwitterFollowStatus] = useState({
    user: '',
    status: 0
  })

  const [users, setUsers] = useState<IUser[]>()
  useEffect(() => {
    axios.get("http://localhost:4000/api/user/getall").then((res: AxiosResponse) => {
      console.log(res.data)
      setUsers(res.data)
    })
  }, [ctx]);

  if (!users) {
    return <p>loading...</p>
  }

  return (
    <>
      <Content>
        <TableContainer>
          <Header>
            <H2>
              Showing all users
            </H2>
          </Header>
          <TablePadding>
            <Table>
              <TableThead>
                <TableRow>
                  <TableHeader>
                    Name
                  </TableHeader>
                  <TableHeader>
                    Location
                  </TableHeader>
                  <TableHeader>
                    Links
                  </TableHeader>
                </TableRow>
              </TableThead>
              <TableBody>
                {users.map((user: IUser) => {

                  const handleFollowSubmit = async () => {
                    try {
                      const res = await axios({
                        method: 'post',
                        url: `http://localhost:4000/api/user/twitterfollow?username=${user.twitter.username}`,
                        withCredentials: true
                      })
                      setTwitterFollowStatus({...twitterFollowStatus, 
                        user: `${user.twitter.username}`,
                        status: res.status
                      })
                      console.log(twitterFollowStatus)
                      console.log(res.data)
                    } catch (err: any) {
                      console.error(err.message)
                    }
                  }

                  return (
                    <TableRow key={user.twitter.username} id={user.twitter.username} >
                      <TableDataCell>
                        <TableDataNameContainer>
                          <TableDataImage src={`${user.github.json.avatar_url}`} />
                          <TableDataName>
                            {user.github.json.name}
                          </TableDataName>
                        </TableDataNameContainer>
                      </TableDataCell>
                      <TableDataCell>
                        <TableDataLocation>
                          {user.github.json.location}
                        </TableDataLocation>
                      </TableDataCell>
                      <TableDataCell>
                        <TableActions>
                          <TableFollow onClick={handleFollowSubmit}>
                            {user.twitter.username === twitterFollowStatus.user && twitterFollowStatus.status === 200 ? `Follow on Twitter ✓` : `Follow on Twitter`}
                            <TwitterIcon />
                          </TableFollow>
                          <TableLink href={`https://www.twitter.com/${user.twitter.username}`} target="blank" rel="noopener noreferrer">
                            <TwitterIcon />
                          </TableLink>
                          <TableLink href={user.github.json.html_url} target="blank" rel="noopener noreferrer">
                            <GitHubIcon />
                          </TableLink>
                          <TableLink href={`https://discordapp.com/channels/@me/${user.discord.username}#${user.discord.discriminator}`} target="blank" rel="noopener noreferrer">
                            <DiscordIcon />
                          </TableLink>
                        </TableActions>
                      </TableDataCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TablePadding>
        </TableContainer>
      </Content>
    </>
  );
};
