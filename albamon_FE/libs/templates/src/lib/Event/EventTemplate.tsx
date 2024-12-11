import classNames from 'classnames';
import styles from './index.module.scss';
import { useQuery } from '@apollo/client';
import { GET_EVENT_LIST } from '@graphql/event';
import {
  FloatingButton,
  Footer,
  ImageWithChildren,
  Title,
  Image,
  Split,
  Group,
} from '@components/lib';
import {
  eventHandlers,
  EventHandlerType,
  EventUserType,
} from '@utils/eventHandler';
import DefaultLayout from 'pages/layout/DefaultLayout';
import { List } from '@components/lib/Event/List/List';
import { Carousel } from '@components/lib/Event/Carousel';
import { Button } from '@components/lib/Event/Button';
import { mapHandlerName } from '@utils/mapHandlerName';

const cx = classNames.bind(styles);
const rootClass = 'event-template';

const EVENT_BUTTONS = ['BUTTON', 'FLOATING_BUTTON', 'IMAGE_WITH_CHILDREN'];

const MAPPED_COMPONENTS = {
  TITLE: Title,
  IMAGE_WITH_CHILDREN: ImageWithChildren,
  GROUP: Group,
  IMAGE: Image,
  BUTTON: Button,
  SPLIT: Split,
  CAROUSEL: Carousel,
  FLOATING_BUTTON: FloatingButton,
  FOOTER: Footer,
  LIST: List,
};

const handleButtonEvent = (
  eventType: EventHandlerType,
  params?: EventUserType
) => {
  const handler = eventHandlers.get(eventType);
  if (handler) {
    handler(params);
  }
};

const RenderComponent = (data) => {
  if (!data?.type) return null;

  const Component = MAPPED_COMPONENTS[data.type];
  if (!Component) return null;

  return (
    <Component {...data}>
      {data.children?.map((child, index) => (
        <RenderComponent key={`${child.type}_${index}`} {...child} />
      ))}
    </Component>
  );
};

export const EventTemplate = () => {
  const {
    data: eventList,
    loading,
    error,
  } = useQuery(GET_EVENT_LIST, {
    variables: { eventId: '1' },
    fetchPolicy: 'network-only',
    pollInterval: 5000,
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error : {error?.message} </p>;

  return (
    <div className={cx(rootClass)}>
      <DefaultLayout>
        {eventList.getEventPageComponents.components.map((item, index) => (
          <RenderComponent key={`${item.type}_${index}`} {...item} />
        ))}
      </DefaultLayout>
      {/* Floating Button 마진*/}
      <div style={{ height: '100px' }} />
    </div>
  );
};
