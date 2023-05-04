import React from 'react'
import { ListGroup } from 'react-bootstrap'
import Button  from 'react-bootstrap/Button'

const tours = [
  {
    name : 'DTE ENERGY MUSIC THEATRE',
    date : 'JUL 16',
    venue : 'DETROIT, MI'
  },
  {
    name : 'BUDWEISER STAGE',
    date : 'JUL 19',
    venue : 'TORONTO,ON'
  },
  {
    name : 'JIGGY LUBE LIVE',
    date : 'JUL 22',
    venue : 'BRISTOW, VA'
  },
  {
    name : 'AK-CHIN PAVILION',
    date : 'JUL 29',
    venue : 'PHOENIX, AZ'
  },
  {
    name : 'T-MOBILE ARENA',
    date : 'AUG 2',
    venue : ' LAS VEGAS, NV'
  },
  {
    name : 'CONCORD PAVILION',
    date : 'AUG 7',
    venue : 'CONCORD, CA'
  },
]

function Home() {
  return (
    < >
      <div className='home-header d-flex flex-column justify-content-around align-items-center'>
        <h1>The Generics</h1>
      <Button variant="outline-info">Get our latest Album</Button>
      <a href="#">

        <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F5%2FPlay-Button-PNG-Image-HD.png&f=1&nofb=1&ipt=03837148f16225f3e249329fae152ae37322afc0d2c2672b0b4e0bd921850e8f&ipo=images" />
      </a>

      </div>
      <main className="d-flex align-items-center flex-column mb-5">

      <h1 className='mb-5 mt-5'>TOURS</h1>
        {
          tours.map(tour => (
            <ListGroup key={tour.date} horizontal>

              <ListGroup.Item>{tour.date}</ListGroup.Item>
              <ListGroup.Item>{tour.venue}</ListGroup.Item>
              <ListGroup.Item>{tour.name}</ListGroup.Item>
              <ListGroup.Item>
                <Button variant='info' className='text-white'>BUY TICKETS</Button>
              </ListGroup.Item>
            </ListGroup>
          ))
        }
      </main>

    </>
  )
}

export default Home;