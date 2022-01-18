import Axios, { AxiosResponse } from 'axios'
import tw from "twin.macro"
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as TwitterIcon } from "../assets/twitter-icon.svg"
import { ReactComponent as GitHubIcon } from "../assets/github-icon.svg"
import { ReactComponent as DiscordIcon } from "../assets/discord-icon.svg"
import { myContext } from "../hooks/Context"
import React, { useEffect, useState, useContext } from "react"
import { IUser } from "../interface"


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

const TableDataMeta = tw.div`font-medium text-gray-100 text-left flex flex-row`

const TableDataMetaLink = tw.a`flex items-center justify-center rounded shadow cursor-pointer bg-secondary-600 transition duration-300 hocus:bg-primary-500 w-6 h-6 ml-1 p-0.5`

const TableDataMetaFollow = tw.a`flex items-center justify-center rounded shadow cursor-pointer bg-secondary-600 transition duration-300 hocus:bg-primary-500  ml-1 py-0.5 px-2`

export default function Home() {
  const ctx = useContext(myContext)

  const [users, setUsers] = useState<IUser[]>()
  useEffect(() => {
    Axios.get("http://localhost:4000/getallusers").then((res: AxiosResponse) => {
      setUsers(res.data.filter((item: IUser) => {
        return item
      }))
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

                  return (
                    <TableRow key={user.discord.id}>
                      <TableDataCell>
                        <TableDataNameContainer>
                          <TableDataImage src={`https://cdn.discordapp.com/avatars/${user.discord.id}/${user.discord.avatar}.png`} />
                          <TableDataName>
                            {user.discord.username}
                          </TableDataName>
                        </TableDataNameContainer>
                      </TableDataCell>
                      <TableDataCell>
                        <TableDataLocation>
                          {user.github.json.location}
                        </TableDataLocation>
                      </TableDataCell>
                      <TableDataCell>
                        <TableDataMeta>
                          <TableDataMetaFollow href={`https://www.twitter.com/${user.twitter.username}`} target="blank" rel="noopener noreferrer">
                            Follow on Twitter
                            <TwitterIcon />
                          </TableDataMetaFollow>
                          <TableDataMetaLink href={`https://www.twitter.com/${user.twitter.username}`} target="blank" rel="noopener noreferrer">
                            <TwitterIcon />
                          </TableDataMetaLink>
                          <TableDataMetaLink href={user.github.json.html_url} target="blank" rel="noopener noreferrer">
                            <GitHubIcon />
                          </TableDataMetaLink>
                          <TableDataMetaLink href={`https://discordapp.com/channels/@me/${user.discord.username}#${user.discord.discriminator}`} target="blank" rel="noopener noreferrer">
                            <DiscordIcon />
                          </TableDataMetaLink>
                        </TableDataMeta>
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
