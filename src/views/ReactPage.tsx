import { Center, Code, Text, Image, Link } from '@chakra-ui/react';
import {technologies} from "../utils/technologies";

const ReactPage = () => {
  const tech = technologies.find(t => t.name === "React")
  return (
      <Center flexDirection={'column'} h={'full'} gap={5}>
          <Image
              h={'30vh'}
              w={'full'}
              src={tech?.frontImage}
              objectFit="contain"
              alt="#"
          />
          <Text>Edit <Code>src/views/ReactPage.tsx</Code> and save to reload.</Text>
          <Link href={tech?.website} isExternal>Learn React</Link>
      </Center>
  );
};

export default ReactPage;