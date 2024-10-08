'use client';

import LogoDark from '@/assets/logo/logo__dark.png';
import LogoLight from '@/assets/logo/logo__light.png';
import LanguagesMenu from '@/components/LanguagesMenu';
import NavigationDrawer from '@/components/Navigation/Drawer';
import AnimatedPressIn from '@/components/animation/AnimatedPressIn';
import { Routes } from '@/constants/routes';
import { i18n } from '@/services/localization';
import { useStore } from '@/zustand/store';
import { Image, Link } from '@chakra-ui/next-js';
import {
  Box,
  Container,
  Divider,
  Flex,
  Icon,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import React from 'react';
import { BsMoonFill } from 'react-icons/bs';
import { FaSun } from 'react-icons/fa';
import { TbMenuDeep } from 'react-icons/tb';

/**
 * Navigation bar component.
 */
export default function NavigationBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const mobileNavbarDisclosure = useDisclosure();
  const routes = Routes();
  const store = useStore();
  const { theme, setTheme } = useTheme();

  const [inDevText, setInDevText] = React.useState(i18n.t('in_development'));

  // Set the in development text when the locale changes
  React.useEffect(() => {
    setInDevText(i18n.t('in_development'));
  }, [store.locale]);

  // Function to handle changing the color mode
  function handleChangeColorMode() {
    // Toggle the color mode for Chakra UI
    toggleColorMode();

    /**
     * Toggle the color mode for next-themes. This is necessary because
     * Chakra UI has a weird bug in dark mode where the page flashes white when
     * refreshing
     */
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <React.Fragment>
      <nav>
        <Container maxW="container.xl" paddingY={2}>
          <Flex alignItems="center">
            {/* Left side - logo */}
            <Box>
              <Link href={routes.Home.path}>
                <Image
                  alt="Timothy Caish Logo"
                  priority={true}
                  src={useColorModeValue(LogoLight, LogoDark)}
                  w={{ base: '100px', md: '150px' }}
                />
              </Link>
            </Box>

            <Spacer display={{ base: 'none', lg: 'flex' }} />

            {/* Middle - links */}
            <Box display={{ base: 'none', lg: 'flex' }}>
              <Flex alignItems="center" me={4} gap={4}>
                {Object.values(routes)
                  .filter((r) => r.name !== routes.Home.name)
                  .map((route) => (
                    <Link href={route.path} key={route.name}>
                      <AnimatedPressIn>
                        <Text
                          color={useColorModeValue('gray.700', 'gray.300')}
                          fontWeight="semibold"
                        >
                          {route.name}
                        </Text>
                      </AnimatedPressIn>
                    </Link>
                  ))}
              </Flex>
            </Box>

            <Spacer />

            {/* Right side */}
            <Flex>
              {/* Languages menu */}
              <Box
                me={4}
                _hover={{
                  cursor: 'pointer'
                }}
              >
                <LanguagesMenu />
              </Box>

              {/* Theme toggle */}
              <Box
                me={4}
                _hover={{
                  cursor: 'pointer'
                }}
              >
                <motion.div
                  onClick={handleChangeColorMode}
                  style={{ maxHeight: '2rem' }}
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{
                    scale: 0.8,
                    rotate: -90
                  }}
                >
                  {colorMode === 'dark' ? (
                    <Icon as={FaSun} color="#DBC300" boxSize={8} />
                  ) : (
                    <Icon as={BsMoonFill} color="gray.700" boxSize={8} />
                  )}
                </motion.div>
              </Box>

              {/* Mobile nav menu */}
              <Box
                display={{ base: 'flex', lg: 'none' }}
                _hover={{ cursor: 'pointer' }}
              >
                <motion.div
                  onClick={mobileNavbarDisclosure.onOpen}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <TbMenuDeep
                    color={useColorModeValue('#2D3748', 'white')}
                    size={35}
                  />
                </motion.div>
              </Box>
            </Flex>
          </Flex>
        </Container>

        <Divider borderColor={useColorModeValue('gray.200', 'gray.600')} />
      </nav>

      <NavigationDrawer
        isOpen={mobileNavbarDisclosure.isOpen}
        onClose={mobileNavbarDisclosure.onClose}
      />
    </React.Fragment>
  );
}
