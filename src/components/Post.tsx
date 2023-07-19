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
         Button, 
         Popover,
         PopoverTrigger,
         Portal,
         PopoverContent,
         PopoverArrow,
         PopoverCloseButton,
         PopoverBody,
         Icon,
        } from '@chakra-ui/react'
import { BsThreeDotsVertical  } from "react-icons/bs";
import { BiUpvote,BiDownvote, BiChat, BiShare, BiSolidUpvote, BiSolidDownvote, BiLink } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { PostType } from '../types/PostType';
import { downvote, upvote } from '../redux/feedSlice';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { arrayRemove, arrayUnion, deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useVote } from '../utils/voteUtils';
import '../styles/Post.css'
import SharePost from '../utils/sharePost';

export function Post({originalPoster, postId, title, text, voteCount}: PostType) {
  const { updatedVoteCount, handleUpvote, handleDownvote, voteStatus } = useVote(postId, voteCount);
  const [upvoteIcon, setUpvoteIcon] = useState(voteStatus === 'upvoted' ? <BiUpvote /> : <BiUpvote />);
  const [downvoteIcon, setDownvoteIcon] = useState(voteStatus === 'downvoted' ? <BiDownvote /> : <BiDownvote />);
  const [showLinkCopied, setShowLinkCopied] = useState(false);

  const handleShareClick = () => {
    navigator.clipboard.writeText(`${window.location.href}posts/${postId}`);
    setShowLinkCopied(true);
    setTimeout(() => {
      setShowLinkCopied(false);
    }, 3000);
  };
  
  // Fill/Unfill the icons based on the vote status
  useEffect(() => {
    if (voteStatus === 'upvoted') {
      setUpvoteIcon(<BiSolidUpvote />);
      setDownvoteIcon(<BiDownvote />);
    } else if (voteStatus === 'downvoted') {
      setUpvoteIcon(<BiUpvote />);
      setDownvoteIcon(<BiSolidDownvote />);
    } else {
      setUpvoteIcon(<BiUpvote />);
      setDownvoteIcon(<BiDownvote />);
    }
  }, [voteStatus]);

  return (
    <Card maxW='md' marginBottom={'20px'} width={'40vw'}>
      <Flex gap='4' flexDirection='row'>
        <Box flexBasis='20%' pr={1}>
          <Flex flexDirection='column' alignItems='center'>
            <Button variant='ghost' leftIcon={upvoteIcon} onClick={handleUpvote}></Button>
            {updatedVoteCount}
            <Button variant='ghost' leftIcon={downvoteIcon} onClick={handleDownvote}></Button>
          </Flex>
        </Box>
        <Box flexBasis='80%'>
          <CardHeader>
            <Flex gap='4'>
              <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Box>
                  <Heading size='lg'>{title}</Heading>
                  <Text fontSize='sm'>{originalPoster}</Text>
                </Box>
              </Flex>
              <IconButton
                variant='ghost'
                colorScheme='gray'
                aria-label='See menu'
                icon={<BsThreeDotsVertical />}
                // TODO: onClick={drop down a 'delete post' option if the user is the original poster}
              />
            </Flex>
          </CardHeader>
          <CardBody>
            <Link to={`/posts/${postId}`}>
              <Text >
                {text}
              </Text>
            </Link>
          </CardBody>
          {/* TODO: Upload image from device feature */}
          <CardFooter justify='space-between' display='flex'>
            <Link to={`/posts/${postId}`}>
              <Button variant='ghost' leftIcon={<BiChat />}></Button>
            </Link>
            <SharePost postId={postId} />
          </CardFooter>
        </Box>
      </Flex>
    </Card>
  );  
}