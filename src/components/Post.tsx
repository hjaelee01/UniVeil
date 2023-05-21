import { Card,
         CardHeader, 
         CardBody, 
         CardFooter, 
         Flex, 
         Box,
         Heading,
         Text,
         IconButton,
         Image,
         Button } from '@chakra-ui/react'
import { BsThreeDotsVertical  } from "react-icons/bs";
import { BiUpvote,BiDownvote } from "react-icons/bi";
import { RxChatBubble, RxShare2 } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import { PostType } from '../types/PostType';
import { downvote, upvote } from '../features/feedSlice';

export function Post({id, title, text, voteCount}: PostType) {
  const dispatch = useDispatch();
  const handleUpvote = () => {
    dispatch(upvote({postId: id}))
  }
  const handleDownvote = () => {
    dispatch(downvote({postId: id}))
  }

  return (
      <Card maxW='md' marginBottom={'20px'}>
        <CardHeader>
          <Flex gap='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Box>
                <Heading size='lg'>{title}</Heading>
              </Box>
            </Flex>
            <IconButton
              variant='ghost'
              colorScheme='gray'
              aria-label='See menu'
              icon={<BsThreeDotsVertical />}
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>
            {text}
          </Text>
        </CardBody>
        {/* TODO: Upload image from device feature */}
        <CardFooter justify='space-between' display='flex'>
          <Button flex='1' variant='ghost' leftIcon={<BiUpvote />} onClick={handleUpvote}></Button>
          {voteCount}
          <Button flex='1' variant='ghost' leftIcon={<BiDownvote />} onClick={handleDownvote}></Button>
          <Button flex='1' variant='ghost' leftIcon={<RxChatBubble />}></Button>
          <Button flex='1' variant='ghost' leftIcon={<RxShare2 />}></Button>
        </CardFooter>
      </Card>
  )
}