import { Card, CardContent, Skeleton } from '@mui/material'

export function SkeletonList({ count = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, idx) => (
        <Card key={idx} elevation={0}>
          <CardContent>
            <Skeleton width="35%" />
            <Skeleton />
            <Skeleton />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

