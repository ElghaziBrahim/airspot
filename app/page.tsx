import Image from 'next/image'
import Container from './componants/Container'
import EmptyState from './componants/EmptyState'
import getListings from './api/actions/getListing'
import ListingCard from './componants/listing/ListingCard'
import getCurrentUser from './api/actions/getCurrentUser'
import styles from "../styles/houmeIndex.module.css"
export default async function Home() {

  const listings = await getListings()
  const currentUser = await getCurrentUser()
  console.log({ listings })
  if (listings.length === 0) {
    return (
      <EmptyState showReset />
    )
  }
  return (
    <Container>
      <div className={styles.listingsContainer}>
        {
          listings.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />

          ))
        }
      </div>
    </Container>
  )
}
