import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'Welcome',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        // {
        //   key: 'Admin page',
        //   title: 'Admin page',
        //   href: 'https://pro.ant.design',
        //   blankTarget: true,
        // },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Hoanguyen-2002/MUSIC_WEBSITE_PHANTAN_PRJ',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Github Music Web',
          href: 'https://github.com/Hoanguyen-2002/MUSIC_WEBSITE_PHANTAN_PRJ',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
