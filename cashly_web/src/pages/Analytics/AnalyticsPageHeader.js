import { Header } from '@/components';

import DatePeriodSelectInput from './DatePeriodSelectInput';

export default function AnalyticsPageHeader() {
  return (
    <Header
      title="Analityka"
      description={`
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Fusce dui nulla, facilisis eu imperdiet non, rhoncus quis nibh. 
                Praesent rutrum viverra iaculis. 
                Phasellus commodo orci vitae venenatis consequat.
            `}
      rightElement={<DatePeriodSelectInput />}
    />
  );
}
