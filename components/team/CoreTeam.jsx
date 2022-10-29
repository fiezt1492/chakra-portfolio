import {
  Box,
  Button,
  Grid,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Autoplay, Mousewheel, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import UserCard from "./UserCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import SectionHeading from "../shared/SectionHeading";

function CoreTeam() {
  const [loading, setLoading] = React.useState(false);
  const [team, setTeam] = React.useState(null);

  const fetchTeam = () => {
    setLoading(true);
    fetch("/api/discord/getteam")
      .then(async (data) => {
        const json = await data.json();
        setLoading(false);
        setTeam(json);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <>
      <SectionHeading mb={4}>
        <Text as="b" fontSize={"xl"}>
          Core Team
        </Text>
      </SectionHeading>
      <Box width={"100%"} mb={10}>
        <Skeleton isLoaded={!loading} fadeDuration={4} height={"400px"}>
          <Box>
            {team && (
              <Swiper
                centeredSlides={true}
                slidesPerView={1}
                spaceBetween={30}
                mousewheel={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, Mousewheel]}
                loop={true}
                grabCursor={true}
                loopFillGroupWithBlank={true}
              >
                {team.map((member, index) => (
                  <SwiperSlide key={member.user.id}>
                    <UserCard
                      fullName={member.more.name}
                      description={`Its been ${
                        24 + index
                      } days since my last commit. ${member.more.quote}`}
                      userName={`${member.user.username}#${member.user.discriminator}`}
                      rank={member.more.rank}
                      email={member.more.email}
                      tags={member.more.tags}
                      avatarSrc={`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=256`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            {!team && !loading && (
              <Button onClick={fetchTeam}>
                Failed to fetch data. Click to retry
              </Button>
            )}
          </Box>
        </Skeleton>
      </Box>
    </>
  );
}

export default CoreTeam;
