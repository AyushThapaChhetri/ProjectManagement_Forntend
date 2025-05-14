import { Box, Flex, Image } from "@chakra-ui/react";
import photo_hand1 from "@/assets/photo_hand1.png";
import photo_hand2 from "@/assets/photo_hand2.png";
import photo_hand3 from "@/assets/photo_hand3.png";
import photo_hand4 from "@/assets/photo_hand4.png";

const PictureZigZag = () => {
  return (
    <>
      <Flex
      // borderWidth="2px"
      // h="400px"
      // // maxHeight="400px"
      // boxSizing="border-box"
      // maxH="400px"
      // w="600px"
      // maxW="400px"

      // h="80%"
      // backgroundImage={`url(${photo_hand1})`}
      // backgroundSize="contain"
      // backgroundPosition="center"
      // backgroundRepeat="no-repeat"
      >
        <Image
          // border="2px solid red"
          rounded="md"
          // h="400px"
          // height="30rem"
          // height={{ xl: "30rem", "2xl": "28rem", ultraHd: "39rem" }}
          // maxW={{ xl: "8rem", "2xl": "10rem", ultraHd: "12rem" }}
          height={{
            base: "150px",
            mobile: "190px",
            mobileLg: "210px",
            tabletSm: "350px",
            wide: "50vh",
            ultraHd: "60vh",
          }}
          w={{
            mobile: "80px",
            mobileLg: "90px",
            tabletSm: "100px",
            wide: "8vw",
            ultraHd: "10vw",
          }}
          maxH="605px"
          maxW="190px"
          // maxH="400px"
          // width="600px"
          // w="500px"
          // maxWidth="150px"
          // maxW="130px"
          fit="fill"
          src={photo_hand1}
        />
      </Flex>
      {/* <Box mt={{ ultraHd: "14vh" }}> */}
      <Box
        mt={{
          base: "clamp(1rem, 5vw, 2rem)", // Better responsiveness for mobile portrait
          mobile: "clamp(2rem, 6vw, 3rem)",
          mobileLg: "clamp(2rem, 7vw, 3.5rem)",
          tabletSm: "clamp(3rem, 6vw, 4rem)",
          wide: "clamp(4rem, 5vw, 5rem)",
          ultraHd: "clamp(5rem, 4vw, 6rem)",
        }}
      >
        <Image
          rounded="md"
          // h="400px"
          // maxH="400px"
          // maxWidth="150px"
          // height="30rem"
          height={{
            base: "150px",
            mobile: "190px",
            mobileLg: "210px",
            tabletSm: "350px",
            wide: "50vh",
            ultraHd: "60vh",
          }}
          w={{
            mobile: "80px",
            mobileLg: "90px",
            tabletSm: "100px",
            wide: "8vw",
            ultraHd: "10vw",
          }}
          maxH="605px"
          maxW="190px"
          fit="fill"
          src={photo_hand2}
        />
      </Box>
      <Box>
        <Image
          rounded="md"
          height={{
            base: "150px",
            mobile: "190px",
            mobileLg: "210px",
            tabletSm: "350px",
            wide: "50vh",
            ultraHd: "60vh",
          }}
          w={{
            mobile: "80px",
            mobileLg: "90px",
            tabletSm: "100px",
            wide: "8vw",
            ultraHd: "10vw",
          }}
          maxH="605px"
          maxW="190px"
          fit="fill"
          src={photo_hand3}
        />
      </Box>
      <Box
        // mt="6rem"
        // mt={{ xl: "2rem", "2xl": "6rem", ultraHd: "8rem" }}
        mt={{
          base: "clamp(1rem, 5vw, 2rem)", // Better responsiveness for mobile portrait
          mobile: "clamp(2rem, 6vw, 3rem)",
          mobileLg: "clamp(2rem, 7vw, 3.5rem)",
          tabletSm: "clamp(3rem, 6vw, 4rem)",
          wide: "clamp(4rem, 5vw, 5rem)",
          ultraHd: "clamp(5rem, 4vw, 6rem)",
        }}
      >
        <Image
          rounded="md"
          height={{
            base: "150px",
            mobile: "190px",
            mobileLg: "210px",
            tabletSm: "350px",
            wide: "50vh",
            ultraHd: "60vh",
          }}
          w={{
            mobile: "80px",
            mobileLg: "90px",
            tabletSm: "100px",
            wide: "8vw",
            ultraHd: "10vw",
          }}
          maxH="605px"
          maxW="190px"
          fit="fill"
          src={photo_hand4}
        />
      </Box>
    </>
  );
};

export default PictureZigZag;
