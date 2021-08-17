import React from 'react';
import {
  CertificateSkeleton,
  CategorySkeleton,
} from 'containers/Farm/components';

const rederSkeletonCertificate = () => {
  const skeleton = [];
  for (let i = 0; i < 10; i += 1) {
    skeleton.push(<CertificateSkeleton key={i} />);
  }
  return skeleton;
};

const rederSkeletonCategory = () => {
  const skeleton = [];
  for (let i = 0; i < 10; i += 1) {
    skeleton.push(<CategorySkeleton key={i} />);
  }
  return skeleton;
};

export { rederSkeletonCertificate, rederSkeletonCategory };
