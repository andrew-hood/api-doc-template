import { ButtonFilled, Modal, View, Text, Banner } from "@go1d/go1d";
import IconCourse from "@go1d/go1d/build/components/Icons/Course";
import { FC } from "react";
import { useModal } from "react-modal-hook";
import { useSelector } from "react-redux";

export const ErrorModal: FC = () => {
  const errors: any = useSelector<any>((state) => state.errors.value);

  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal isOpen={true} onRequestClose={hideModal} title="Errors">
        {errors?.map((error: any, index: number) => (
          <Banner key={index} status="danger">
            <Text paddingBottom={3} fontWeight="semibold">
              {error.title}
            </Text>
            <Text>{error.message}</Text>
          </Banner>
        ))}
      </Modal>
    );
  }, [errors]);

  return (
    <View position="fixed" css={{ bottom: 25, right: 25 }}>
      <ButtonFilled
        color="danger"
        icon={IconCourse}
        size="lg"
        onClick={showModal}
        boxShadow="distant"
        round
      />
    </View>
  );
};
