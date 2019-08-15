// tslint:disable:max-line-length

interface UdemySchema {
    '_class': string;
    'assessment_type': string;
    'correct_response': string[];
    'id': number;
    'prompt': {
      'answers': string[],
      'explanation': string;
      'feedbacks': string[],
      'question': string;
      'relatedLectureIds': string;
    };
    'question_plain': string;
    'related_lectures': string[];
    'section': string;
}


export const data: UdemySchema[] = [
  {
    _class: 'assessment',
    assessment_type: 'multiple-choice',
    correct_response: [
      'e',
    ],
    id: 11143994,
    prompt: {
      answers: [
        'Use an RTMP distribution instead of a web distribution.',
        'Use Amazon Kinesis to distribute the changes in the articles real-time. ',
        'Set TTL to 60 seconds.',
        'Invalidate all the files from edge caches.',
        'Set TTL to 0 seconds.',
        'Disable TTL.',
      ],
      explanation: '<p>You can control how long your objects stay in a CloudFront cache before CloudFront forwards another request to your origin. Reducing the duration allows you to serve dynamic content. Increasing the duration means your users get better performance because your objects are more likely to be served directly from the edge cache. A longer duration also reduces the load on your origin.</p> <p>Using TTL (Time To Live), you can specify the minimum amount of time, in seconds, that you want objects to stay in CloudFront caches before CloudFront forwards another request to your origin to determine whether the object has been updated. The default value for Minimum TTL is 0 seconds.</p> <p>&nbsp;</p> <p><strong>Reference:</strong></p> <p><a href="http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html">http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html</a></p> <p>&nbsp;</p> <p><strong>Check out this Amazon CloudFront Cheat Sheet:</strong></p> <p><a href="https://tutorialsdojo.com/aws-cheat-sheet-amazon-cloudfront/"><span style="font-weight: 400;">https://tutorialsdojo.com/aws-cheat-sheet-amazon-cloudfront/</span></a></p>',
      feedbacks: [
        '',
        '',
        '',
        '',
        '',
        '',
      ],
      question: 'A 24-hour global news organization is using a CloudFront web distribution for its dynamic news website for caching frequently accessed resources. There are some breaking news articles which are always updated every hour or even every minute. Your CTO asked you to change the configuration in such a way that when the editors revised the content, the change should be immediately shown to the client. \n\nWhich of the following configuration should you implement to fulfill this requirement?',
      relatedLectureIds: '',
    },
    question_plain: 'A 24-hour global news organization is using a CloudFront web distribution for its dynamic news website for caching frequently accessed resources. There are some breaking news articles which are always updated every hour or even every minute. Your CTO asked you to change the configuration in such a way that when the editors revised the content, the change should be immediately shown to the client. \n\nWhich of the following configuration should you implement to fulfill this requirement?',
    related_lectures: [],
    section: 'Domain - Continuous Improvement for Existing Solutions',
  },
  {
    _class: 'assessment',
    assessment_type: 'multi-select',
    correct_response: [
      'b',
      'd',
    ],
    id: 11143996,
    prompt: {
      answers: [
        'Delete the entire stack and create a new one.',
        'Create and start new instances to replace your current online instances. Then delete the current instances. The new instances will have the latest set of security patches installed during setup.',
        'Use CloudFormation to deploy the security patches.',
        'Run the Update Dependencies stack command for Linux based instances.',
        'On Windows-based instances, run the Update Dependencies stack command.',
        'Use WAF to deploy the security patches.',
      ],
      explanation: '<p>Linux operating system providers supply regular updates, most of which are operating system security patches but can also include updates to installed packages. You should ensure that your instances\' operating systems are current with the latest security patches.</p> <p>By default, AWS OpsWorks Stacks automatically installs the latest updates during setup, after an instance finishes booting. AWS OpsWorks Stacks does not automatically install updates after an instance is online, to avoid interruptions such as restarting application servers. Instead, you manage updates to your online instances yourself, so you can minimize any disruptions.</p> <p>AWS recommends that you use one of the following to update your online instances:</p> <ul> <li>-Create and start new instances to replace your current online instances. Then delete the current instances. The new instances will have the latest set of security patches installed during setup.</li> <li>-On Linux-based instances in Chef 11.10 or older stacks, run the Update Dependencies stack command, which installs the current set of security patches and other updates on the specified instances.</li> </ul> <p>&nbsp;</p> <p><strong>Reference: </strong></p> <p><a href="https://docs.aws.amazon.com/opsworks/latest/userguide/workingsecurity-updates.html">https://docs.aws.amazon.com/opsworks/latest/userguide/workingsecurity-updates.html</a></p> <p>&nbsp;</p> <p><strong>Check out this AWS OpsWorks Cheat Sheet:</strong></p> <p><a href="https://tutorialsdojo.com/aws-cheat-sheet-aws-opsworks/"><span style="font-weight: 400;">https://tutorialsdojo.com/aws-cheat-sheet-aws-opsworks/</span></a></p>',
      feedbacks: [
        '',
        '',
        '',
        '',
        '',
        '',
      ],
      question: 'A blockchain application was deployed in AWS a year ago using Opsworks. There has been a lot of security patches lately for the underlying linux servers of the blockchain application, which means that the Opswork stack instances should be updated. \n\nIn this scenario, which of the following are the best practices when updating an AWS stack? Select all that applies.',
      relatedLectureIds: '',
    },
    question_plain: 'A blockchain application was deployed in AWS a year ago using Opsworks. There has been a lot of security patches lately for the underlying linux servers of the blockchain application, which means that the Opswork stack instances should be updated. \n\nIn this scenario, which of the following are the best practices when updating an AWS stack? Select all that applies.',
    related_lectures: [],
    section: 'Domain - Design for New Solutions',
  },
];

export default data;
