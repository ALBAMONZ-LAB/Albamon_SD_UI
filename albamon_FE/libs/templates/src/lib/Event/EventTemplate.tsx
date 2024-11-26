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
} from '@components/lib';
import {
  eventHandlers,
  EventHandlerType,
  EventUserType,
} from '@utils/eventHandler';

const cx = classNames.bind(styles);
const rootClass = 'event-template';

const EVENT_BUTTONS = ['BUTTON', 'FLOATING_BUTTON', 'IMAGE_WITH_CHILDREN'];

const MAPPED_COMPONENTS = {
  TITLE: Title,
  IMAGE_WITH_CHILDREN: ImageWithChildren,
  IMAGE: Image,
  SPLIT: Split,
  CAROUSEL: 'carousel',
  FLOATING_BUTTON: FloatingButton,
  FOOTER: Footer,
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
    <Component
      {...data}
      onClick={() => {
        EVENT_BUTTONS.includes(data.type) &&
          handleButtonEvent(data.type, { name: 'roum' });
      }}
    >
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
    // TODO 임의 eventId
    variables: { eventId: '1' },
  });

  // console.log(eventList.getEventPageComponents.components);

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error : {error?.message} </p>;

  return (
    <div className={cx(rootClass)}>
      {eventList.getEventPageComponents.components.map((item, index) => (
        <RenderComponent key={`${item.type}_${index}`} {...item} />
      ))}
    </div>
  );
};
