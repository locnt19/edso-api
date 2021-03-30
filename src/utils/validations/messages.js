import Joi from 'joi';

const recipientSchema = Joi.object()
  .keys({
    recipientType: Joi.string().required(),
    conversationId: Joi.when('recipientType', {
      is: 'conversation',
      then: Joi.string().required(),
      otherwise: Joi.valid(null),
    }),
    userIds: Joi.when('recipientType', {
      is: 'conversation',
      then: Joi.valid(null),
      otherwise: Joi.array().items(Joi.string()).min(1),
    }),
  })
  .required();

const attachmentSchema = Joi.object().keys({
  type: Joi.string(),
  attachmentId: Joi.when('type', {
    is: 'media',
    then: Joi.string().required(),
    otherwise: Joi.valid(null),
  }),
  url: Joi.when('type', {
    is: 'media',
    then: Joi.string().allow(null, ''),
    otherwise: Joi.string().uri({
      allowRelative: false,
    }),
  }),
});

const messageSchema = Joi.object().keys({
  text: Joi.when('attachments.length', {
    is: 0,
    then: Joi.string().min(1),
    otherwise: Joi.string().allow(null, ''),
  }),
  attachments: Joi.array().items(attachmentSchema).default([]),
});

export const sendMessageSchema = Joi.object()
  .keys({
    recipient: recipientSchema,
    message: Joi.when('senderAction', {
      is: Joi.exist(),
      then: Joi.valid(null),
      otherwise: messageSchema,
    }),
    senderAction: Joi.string(),
  })
  .xor('message', 'senderAction');
